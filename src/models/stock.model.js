import getConnection from "../config/database.js"

const stock_model = {

    getStock: async (req) => {
        const id_stock = req.params.idStock

        const select = "SELECT * FROM stock WHERE id_stock = ?"

        const connection = await getConnection()

        const [results] = await connection.query(select, [id_stock])

        return results

    },

    getAllStocks: async (req) => {

        const filaInicial = req.body.fila || 0

        const select = "SELECT * FROM stock LIMIT 10 OFFSET ?"

        const connection = await getConnection()

        const [results] = await connection.query(select, [filaInicial])

        return results
    },

    addStock: async (req) => {

        const { usuarios_id, sucursales_id } = req.body

        const insert = "INSERT INTO stock (usuarios_id,sucursales_id) VALUES (?,?)"

        try {
            var connection = await getConnection()

            await connection.beginTransaction()

            const [results] = connection.query(insert, [usuarios_id, sucursales_id])

            await connection.commit()

            return results

        } catch (error) {
            await connection.rollback()
            new Error(400)
        }
    },

    updateStock: async (req) => {
        
        const update = "UPDATE stock SET ultimaEdicion = ?"
        try {
            var connection = await getConnection()

            await connection.beginTransaction()

            connection.query(update)

        } catch (error) {
            await connection.rollback()
            new Error(400)
        }
    }
}


export default stock_model