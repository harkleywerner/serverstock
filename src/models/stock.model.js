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

        const { usuarios_id = 1, sucursales_id = 1, listaDeNuevoStock } = req.body;

        const insert = "INSERT INTO stock (usuarios_id,sucursales_id,lote) VALUES (?,?,?)";

        const ultimaStock = "SELECT ABS(COUNT(*) + 1) as lote FROM stock WHERE sucursales_id = ?" //Este enfoque sirve para determinar que numero de lote es


        let connection;

        try {

            connection = await startConnection().getConnection();

            await connection.beginTransaction();

            const [[{ lote }]] = await connection.query(ultimaStock, [1])

            const [{ insertId }] = await connection.query(insert, [usuarios_id, sucursales_id, lote]);

            await detalle_de_stock_model.addDetalleDeStock({ connection, insertId, listaDeNuevoStock })

            await connection.commit()

        } catch (error) {

            await connection.rollback();

            throw error

        } finally {
            if (connection) await connection.release();
        }
    },

    updateStock: async (req, next) => {

        const { id_stock } = req.body

        const update = "UPDATE stock SET ultima_edicion = NOW() WHERE id_stock = ?"

        let connection;
        try {
            connection = await startConnection().getConnection()

            await connection.beginTransaction()

            await connection.query(update, [id_stock])

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


export default stock_model