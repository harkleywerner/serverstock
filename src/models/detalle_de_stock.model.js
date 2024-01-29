import startConnection from "../config/database.js"
import { DataBaseError } from "../utils/errors.utils.js"

const detalle_de_stock_model = {

    getDetallesDeStock: async (req) => {

        const { stock_id, fila_incial = 0 } = req.body

        const select = `SELECT * FROM detalle_de_stock WHERE stock_id = ? LIMIT 15 OFFSET  ?`

        const connection = await startConnection()

        const [results] = connection.query(select, [stock_id, fila_incial])

        return results
    },

    updateDetalleDeStock: async (req, res, next) => {

        const { lista_de_cambios = [] } = req.body

        let connection;

        try {

            connection = await startConnection().getConnection()

            await connection.beginTransaction()

            for (const i of lista_de_cambios) {

                const { cantidad, producto_id, stock_id, accion } = lista_de_cambios[i]

                const verificarTranssaciones = "SELECT COALESCE(count(cantidad)) as cantidad FROM detalle_de_transsaciones WHERE productos_id = ? AND stock_id = ?"

                const [res] = await connection.query(verificarTranssaciones, [producto_id, stock_id])

                if (cantidad < res.cantidad && accion == "edit") {
                    throw new DataBaseError(`La cantidad del producto_id ${producto_id} es menor al numero de transsaciones.`, 422)
                }
                else if (res.cantidad > 0 && accion == "remove") {
                    throw new DataBaseError(`No puede remover el producto_id ${producto_id} ya que contiene transsaciones mayores a 0`, 422)
                }

                const update = "UPDATE detalle_de_stock SET cantidad = ?, ultima_edicion = NOW() WHERE stock_id = ? AND "

                const [results] = await connection.query(update, [cantidad, stock_id])

                return results
            }

            await connection.commit()

        } catch (error) {
            await connection.rollback()
            next(error)
        }
        finally {
            if (connection) await connection.release()
        }
    },

    addDetalleDeStock: async (req, next) => {

        const { listaDeNuevoStock = [], insertID } = req

        let connection;
        try {

            connection = await startConnection().getConnection()

            await connection.beginTransaction()

            for (const i of listaDeNuevoStock) {

                const { producto_id, cantidad } = listaDeNuevoStock[i]

                const post = "INSERT INTO detalle_de_stock (cantidad,productos_id,stock_id) VALUES(?,?,?)"

                await connection.query(post, [cantidad, producto_id, insertID])
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


export default detalle_de_stock_model