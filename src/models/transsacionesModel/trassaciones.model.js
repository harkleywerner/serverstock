import pool from "../../config/database.js"
import validations from "./transsaciones_model.validations.js"

const trassaciones_model = {

    addTranssacion: async (req, next) => {

        const { sucursal_info = {}, usuario_info = {} } = req.session
        const { id_sucursal } = sucursal_info
        const { id_usuario } = usuario_info

        const insert = `
        INSERT INTO transsaciones (cantidad,id_producto,id_usuario,id_stock)
        VALUES(?,?,?,?)  
        `

        const { cantidad, id_producto, id_stock } = req.body

        const verificarCantidad = Math.sign(cantidad) == -1

        const cantidadPositiva = Math.abs(cantidad)

        let connection;

        try {
            connection = await pool.getConnection()

            await connection.beginTransaction()

            let restante = cantidadPositiva

            while (restante > 0) {

                const {
                    total_stock,
                    devoluciones_permitidas,
                    id_stock_actual,
                    verificacionLength
                } = await validations.validationAddStock({ connection, id_producto, cantidad, id_stock, id_sucursal })

                const transsacionPositiva = restante > total_stock ? total_stock : restante

                const trassacionNegativa = restante > devoluciones_permitidas ? devoluciones_permitidas : restante

                const verificacion = verificarCantidad ? -trassacionNegativa : transsacionPositiva

                if (verificacionLength ) {
                    await connection.query(insert, [verificacion, id_producto, id_usuario,id_stock_actual])
                    restante -= Math.abs(verificacion)
                }else {
                    restante = 0
                }
            }

            await connection.commit()

            return { cantidad: verificarCantidad ? cantidadPositiva : -cantidadPositiva } //Se devuelve el signo contrario del que llego



        } catch (error) {
            next(error)
            await connection.rollback()
        }
        finally {
            if (connection) await connection.release()
        }
    },

    getTranssacionByIdStock: async (req) => {

        const { sucursal_info = {} } = req.session
        const { id_sucursal } = sucursal_info

        const connection = await pool

        const { id_producto, id_stock } = req.query

        let select = `
        SELECT
        CONVERT(-COALESCE(SUM(t.cantidad), 0),signed) AS devoluciones_permitidas,
        CONVERT(MAX( d.cantidad) - COALESCE(SUM(t.cantidad), 0),signed) AS cantidad_total
        FROM stock s
        LEFT JOIN detalle_de_stock d ON
        d.id_stock = s.id_stock
        LEFT JOIN transsaciones t ON
         t.id_producto = d.id_producto AND t.id_stock = d.id_stock
        WHERE  s.id_stock = ? AND d.id_producto = ? AND s.id_sucursal = ?
        GROUP BY s.id_stock
          `

        const [results] = await connection.query(select, [id_stock, id_producto, id_sucursal])

        return results
    },



}


export default trassaciones_model