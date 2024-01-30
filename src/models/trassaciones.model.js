import startConnection from "../config/database.js"
import { DataBaseError } from "../utils/errors.utils.js"

const trassaciones_model = {

    addTranssacion: async (req, next) => {

        const { cantidad, id_producto } = req.body

        const verificarCantidad = Math.sign(cantidad) == -1

        let connection;

        try {
            connection = await startConnection().getConnection()

            await connection.beginTransaction()

            const verificarStock = //En caso de cantidad positiva 
                `SELECT COALESCE(SUM(s.cantidad),0) - COALESCE(SUM(t.cantidad),0) as total
            FROM detalle_de_stock s
            LEFT JOIN transsaciones t ON s.productos_id = t.productos_id
            WHERE s.productos_id = ?
            `

            const verficiarTranssacion = `SELECT SUM(cantidad) as total FROM transsaciones WHERE productos_id = ? ` //En caso de cantidad negativa 

            const [results] = await connection.query(verificarCantidad ? verficiarTranssacion : verificarStock, [id_producto])

            if (Math.abs(cantidad) > results.total) throw new DataBaseError("La cantidad ingresada es superior a la dispobilidad en el stock", 422)

            let restante = Math.abs(cantidad)

            while (restante > 0) {//Esto no va dar loop infinito, por el primer filtro de verificacion, ya que va hacer las restas de forma precisa.
                const verificarStock2 =
                    `
                    SELECT
                 s.stock_id,
                COALESCE(SUM(s.cantidad),0) - COALESCE(SUM(t.cantidad),0) as total
                FROM detalle_de_stock s
                 LEFT JOIN transsaciones t ON s.productos_id = t.productos_id
                 WHERE s.productos_id = ?
                GROUP BY s.stock_id
                HAVING total > 0
                LIMIT 1
                `
                const [{ stock_id, total }] = await connection.query(verificarStock2, [id_producto])

                const insert = "INSERT INTO transsaciones (productos_id,cantidad,sucursales_id,usuarios_id,stock_id) VALUES(?,?,?,?,?)"

                await connection.query(insert, [Math.min(total, verificarCantidad ? -restante : restante), id_producto, 1, 1, stock_id])

                restante - total
            }


            await connection.commit()

        } catch (error) {
            await connection.rollback()
            next(error)
        }
        finally {
            if (connection) await connection.release()
        }
    }

}


export default trassaciones_model