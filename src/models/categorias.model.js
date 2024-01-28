import getConnection from "../config/database.js"

const categorias_model = {

    getCategorias: async () => {

        const select = `SELECT * FROM categorias `

        const connection = await getConnection()

        const [results] = await connection.query(select)

        return results
    }
}


export default categorias_model