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

    updateDetalleDeStock: async (req, next) => {

        const { lista_de_cambios = [] } = req.body

        let connection;

        try {

            connection = await startConnection().getConnection()

            await connection.beginTransaction()

            for (const i of lista_de_cambios) {

                const { cantidad, producto_id, stock_id, accion } = lista_de_cambios[i]

                const verificarTranssaciones = "SELECT COALESCE(count(cantidad)) as cantidad FROM transsaciones WHERE productos_id = ? AND stock_id = ?"

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

    addDetalleDeStock: async ({ listaDeNuevoStock, connection, insertId, }) => {
        try {
            const insertDetalles = "INSERT INTO detalle_de_stock (cantidad,productos_id,stock_id) VALUES(?,?,?)";

            for (const i of listaDeNuevoStock) {
                const { id_producto, cantidad } = i;
                await connection.query(insertDetalles, [cantidad, id_producto, insertId]);
            }

        } catch (error) {

            if (error?.errno == 1452) {
                throw new DataBaseError("Algun item del que intentas ingresar no se encuentra disponible.", 400)
            } else {
                throw error
            }
        }
    }
}


export default detalle_de_stock_model