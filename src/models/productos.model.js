import getConnection from "../config/database"

const productos_model = {

    getProductos: async (req) => {

        const filaIncial = req.body.fila

        const select = `SELECT * FROM productos LIMIT 15 OFFSET ? `

        const connection = await getConnection()

        const [results] = await connection.query(select, [filaIncial])

        return results
    }
}


export default productos_model