import pool from "../../config/database.js"
import validation from "./detalle_de_stock_model.validations.js"


const detalle_de_stock_model = {

    getDetallesDeStock: async (req) => {

        const { id_stock } = req.query

        let select = `
        SELECT
        s.id_detalle_de_stock,
        s.cantidad,
        p.nombre as nombre,
        p.id_producto,
        c.nombre as categoria
        FROM detalle_de_stock  s INNER JOIN
        productos p  ON s.id_producto = p.id_producto
        INNER JOIN categorias c ON c.id_categoria = p.id_categoria
        WHERE s.id_stock = ?
        `

        const connection = await pool

        const [results] = await connection.query(select, [id_stock])

        return results
    },

    getDetalleDeStockByIdProducto: async (req) => {


        const connection = await pool

        const { id_producto, id_stock } = req.body

        let select = `
        SELECT
        CONVERT(-COALESCE(SUM(t.cantidad), 0),signed) AS devoluciones_permitidas,
        CONVERT( MAX( s.cantidad) - COALESCE(SUM(t.cantidad), 0),signed) AS cantidad_total
        FROM detalle_de_stock s
        LEFT JOIN transsaciones t ON
         t.id_producto = s.id_producto AND t.id_stock = s.id_stock
        WHERE  s.id_stock = ? AND s.id_producto = ?
        GROUP BY s.id_stock;
          `

        const [results] = await connection.query(select, [id_stock, id_producto])
        return results
    },


    updateDetalleDeStock: async ({ id_stock, pruductos_patch = [], connection, resumen }) => {

        const update = "UPDATE detalle_de_stock SET cantidad = ?, ultima_edicion = NOW() WHERE id_detalle_de_stock = ?  "


        for (const producto of pruductos_patch) {

            const { cantidad, id_detalle_de_stock, id_producto } = producto

            const cantidadPositiva = Math.abs(cantidad)

            const { cantidad_sincronizacion, verificarCantidadTranssaciones } =
                await validation.validationUpdateDetalleDeStock({ cantidad: cantidadPositiva, connection, id_producto, id_stock })

            if (verificarCantidadTranssaciones) {
                resumen[id_producto] = { cantidad_sincronizacion, sincronizacion: "failed_patch" }
            } else {

                const [{ affectedRows }] = await connection.query(update, [cantidadPositiva, id_detalle_de_stock])

                if (affectedRows == 0) {
                    resumen[id_producto] = { sincronizacion: "info_patch" }
                } else {
                    resumen[id_producto] = { cantidad: cantidadPositiva, sincronizacion: "success_patch" }
                }

            }
        }

    },

    addDetalleDeStock: async ({ connection, pruductos_post = [], id_stock, resumen }) => {

        const insert = "INSERT INTO detalle_de_stock (cantidad,id_producto,id_stock) VALUES(?,?,?)";

        for (const producto of pruductos_post) {

            const { id_producto, cantidad } = producto;

            const {
                verificarProductoEnStock,
                id_detalle_de_stock
            } = await validation.validationAddDetalleDeStock({ connection, id_producto, id_stock })

            if (verificarProductoEnStock) {
                resumen[id_producto] = { sincronizacion: "info_post", id_detalle_de_stock }
            } else {
                const [res] = await connection.query(insert, [Math.abs(cantidad), id_producto, id_stock]);
                resumen[id_producto] = { id_detalle_de_stock: res.insertId, sincronizacion: "success_post" }
            }
        }

    },

    removeDetalleDeStock: async ({ connection, productos_delete = [], resumen, id_stock }) => {

        const deletDetalles = "DELETE FROM  detalle_de_stock WHERE id_detalle_de_stock = ?";


        for (const producto of productos_delete) {

            const { id_detalle_de_stock, id_producto } = producto;

            const {
                cantidad_sincronizacion,
                verificarBorrado
            } = await validation.validationRemoveDetalleDeStock({ id_producto, connection, id_stock })

            if (verificarBorrado) {
                const [{ affectedRows }] = await connection.query(deletDetalles, [id_detalle_de_stock]);
                if (affectedRows == 0) {
                    resumen[id_producto] = { sincronizacion: "info_delete" }
                } else {
                    resumen[id_producto] = { sincronizacion: "success_delete" }
                }

            } else {
                resumen[id_producto] = { cantidad_sincronizacion, sincronizacion: "failed_delete" }

            }
        }

    }
}


export default detalle_de_stock_model