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
            LEFT JOIN transsaciones t ON s.id_producto = t.id_producto
            WHERE s.id_producto = ?
            `

            const verficiarTranssacion = `SELECT SUM(cantidad) as total FROM transsaciones WHERE id_producto = ? ` //En caso de cantidad negativa 

            const [results] = await connection.query(verificarCantidad ? verficiarTranssacion : verificarStock, [id_producto])

            if (Math.abs(cantidad) > results.total) throw new DataBaseError("La cantidad ingresada es incorrecta a la disponible en stock", 422)

            let restante = Math.abs(cantidad)

            while (restante > 0) {//Esto no va dar loop infinito, por el primer filtro de verificacion, ya que va hacer las restas de forma precisa.
                const verificarStock2 =
                    `
                    SELECT
                 s.id_stock,
                COALESCE(SUM(s.cantidad),0) - COALESCE(SUM(t.cantidad),0) as total
                FROM detalle_de_stock s
                 LEFT JOIN transsaciones t ON s.id_producto = t.id_producto
                 WHERE s.id_producto = ?
                GROUP BY s.id_stock
                HAVING total > 0
                LIMIT 1
                `
                const [{ id_stock, total }] = await connection.query(verificarStock2, [id_producto])

                const insert = "INSERT INTO transsaciones (id_producto,cantidad,id_sucursal,id_usuario,id_stock) VALUES(?,?,?,?,?)"

                await connection.query(insert, [Math.min(total, verificarCantidad ? -restante : restante), id_producto, 1, 1, id_stock])

                restante -= total
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