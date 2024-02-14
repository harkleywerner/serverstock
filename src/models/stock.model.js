import startConnection from "../config/database.js"
import { DataBaseError } from "../utils/errors.utils.js"
import detalle_de_stock_model from "./detalle_de_stock.model.js"

const stock_model = {

    getStock: async (req) => {
        const id_stock = req.params.idStock

        const select = "SELECT * FROM stock WHERE id_stock = ?"

        const connection = await startConnection()

        const [results] = await connection.query(select, [id_stock])

        return results

    },

    getAllStocks: async (req) => {

        const filaInicial = req.body.fila || 0

        const select = "SELECT * FROM stock LIMIT 10 OFFSET ?"

        const connection = await startConnection()

        const [results] = await connection.query(select, [filaInicial])

        return results
    },

    addStock: async (req) => {

        const { usuarios_id = 1, id_sucursal = 1, listaDeNuevoStock } = req.body;

        const insert = "INSERT INTO stock (id_usuario,id_sucursal,lote) VALUES (?,?,?)";

        const ultimaStock = "SELECT ABS(COUNT(*) + 1) as lote FROM stock WHERE id_sucursal = ?" //Este enfoque sirve para determinar que numero de lote es


        let connection;

        try {

            connection = await startConnection().getConnection();

            await connection.beginTransaction();

            const [[{ lote }]] = await connection.query(ultimaStock, [1])

            const [{ insertId }] = await connection.query(insert, [usuarios_id, id_sucursal, lote]);

            for (const producto of listaDeNuevoStock) {
                await detalle_de_stock_model.addDetalleDeStock({ connection, id_stock: insertId, producto })
            }

            await connection.commit()

            return {
                lote
            }

        } catch (error) {

            await connection.rollback();

            throw error

        } finally {
            if (connection) await connection.release();
        }
    },

    updateStock: async (req) => {

        const { id_stock, lista_de_cambios } = req.body

        const update = "UPDATE stock SET ultima_edicion = NOW() WHERE id_stock = ?"
        const verificarTranssaciones = "SELECT COALESCE(count(cantidad)) as cantidad FROM transsaciones WHERE id_producto = ? AND id_stock = ?"
        const verificarProductoEnStock = "SELECT 1 FROM detalle_de_stock WHERE id_producto = ? AND id_stock = ? "

        let connection;
        try {
            connection = await startConnection().getConnection()

            await connection.beginTransaction()

            for (const producto of lista_de_cambios) {

                const { id_producto, accion, cantidad, nombre } = producto

                if (accion == "post") {

                    const [res] = await connection.query(verificarProductoEnStock, [id_producto, id_stock])

                    if (res.length > 0) throw new DataBaseError(`El producto [${nombre}] ya se encuentra en el stock`, 422)

                    await detalle_de_stock_model.addDetalleDeStock({ producto, connection, id_stock })

                } else if (accion == "put") {

                    const [res] = await connection.query(verificarTranssaciones, [id_producto, id_stock])

                    if (Math.abs(cantidad) < res.cantidad) throw new DataBaseError(`La cantidad del producto ${nombre} es menor al numero de transsaciones.`, 422)

                    await detalle_de_stock_model.updateDetalleDeStock({ producto, connection, id_stock })
                } else {
                    await detalle_de_stock_model.removeDetalleDeStock({ producto, connection })
                }

            }

            await connection.query(update, [id_stock])

            await connection.commit()

        } catch (error) {
            await connection.rollback()
            throw error
        }
        finally {
            if (connection) await connection.release()
        }

    }
}


export default stock_model