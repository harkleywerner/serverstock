import pool from "../../config/database.js"
import validation from "./detalle_de_stock_model.validations.js"


const detalle_de_stock_model = {

    getDetallesDeStock: async (req) => {

        const { sucursal_info = {} } = req.session
        
        const { id_sucursal } = sucursal_info

        const { id_stock } = req.query

        let select = `
        SELECT
        s.id_detalle_de_stock,
        s.cantidad,
        p.nombre as nombre,
        p.id_producto,
        c.nombre as categoria
        FROM stock st
        INNER JOIN detalle_de_stock s ON s.id_stock = st.id_stock
        INNER JOIN productos p  ON s.id_producto = p.id_producto
        INNER JOIN categorias c ON c.id_categoria = p.id_categoria
        WHERE s.id_stock = ? and st.id_sucursal = ?
        `

        const connection = await pool

        const [results] = await connection.query(select, [id_stock, id_sucursal])

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