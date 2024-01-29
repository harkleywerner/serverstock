import startConnection from "../config/database.js"

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

    addStock: async (req, next) => {

        const { usuarios_id, sucursales_id } = req.body

        const insert = "INSERT INTO stock (usuarios_id,sucursales_id) VALUES (?,?)"

        let connection;

        try {
            connection = await startConnection().getConnection()

            await connection.beginTransaction()

            const [results] = await connection.query(insert, [usuarios_id, sucursales_id])

            await connection.commit()

            return results.insertId

        } catch (error) {
            await connection.rollback()
            next(error)
        }
        finally{
            if(connection) await connection.release()
        }

    },

    updateStock: async (req, res, next) => {

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
        finally{
            if(connection) await connection.release()
        }
    
    }
}


export default stock_model