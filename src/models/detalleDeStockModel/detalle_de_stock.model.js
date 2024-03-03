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
        -COALESCE(SUM(t.cantidad), 0) AS devoluciones_permitidas,
         MAX( s.cantidad) - COALESCE(SUM(t.cantidad), 0) AS cantidad_total
        FROM detalle_de_stock s
        LEFT JOIN transsaciones t ON
         t.id_producto = s.id_producto AND t.id_stock = s.id_stock
        WHERE  s.id_stock = ? AND s.id_producto = ?
        GROUP BY s.id_stock;
          `

        const [results] = await connection.query(select, [id_stock, id_producto])

        return results
    },


    updateDetalleDeStock: async ({ id_stock, pruductos_patch = [], connection, f_patch = {}, s_patch = {} }) => {

        const update = "UPDATE detalle_de_stock SET cantidad = ?, ultima_edicion = NOW() WHERE id_detalle_de_stock = ?  "


        for (const producto of pruductos_patch) {

            const { cantidad, id_detalle_de_stock, id_producto } = producto

            const { cantidad_minima, verificarCantidadTranssaciones } = await validation.validationUpdateDetalleDeStock({ cantidad, connection, id_producto, id_stock })

            if (verificarCantidadTranssaciones) {
                f_patch[id_producto] = { cantidad: cantidad_minima }
            } else {

                await connection.query(update, [Math.abs(cantidad), id_detalle_de_stock])

                s_patch[id_producto] = { cantidad }
            }
        }

    },

    addDetalleDeStock: async ({ connection, pruductos_post = [], id_stock, f_post = [], s_post = {} }) => {

        const insert = "INSERT INTO detalle_de_stock (cantidad,id_producto,id_stock) VALUES(?,?,?)";

        for (const producto of pruductos_post) {

            const { id_producto, cantidad } = producto;

            const resValidation = await validation.validationAddDetalleDeStock({ connection, id_producto, id_stock })

            if (resValidation) {
                f_post.push(id_producto)
            } else {
                const [res] = await connection.query(insert, [cantidad, id_producto, id_stock]);
                s_post[id_producto] = { id_detalle_de_stock: res.insertId, id_producto }
            }
        }

    },

    removeDetalleDeStock: async ({ connection, productos_delete = [], s_delete = [], f_delete = [], id_stock }) => {

        const deletDetalles = "DELETE FROM  detalle_de_stock WHERE id_detalle_de_stock = ?";


        for (const producto of productos_delete) {

            const { id_detalle_de_stock, id_producto, cantidad } = producto;



            const res = await validation.validationRemoveDetalleDeStock({ id_producto, cantidad, connection, id_stock })

            if (res) {
                f_delete.push(id_producto)
            } else {
                s_delete.push(id_producto)
                await connection.query(deletDetalles, [id_detalle_de_stock]);
            }
        }

    }
}


export default detalle_de_stock_model