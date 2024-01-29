import startConnection from "../config/database.js"


const categorias_model = {

    getCategorias: async () => {

        let select = `SELECT * FROM categorias `

        const connection = await startConnection()

        const [results] = await connection.query(select)

        return results
    }
}


export default categorias_model