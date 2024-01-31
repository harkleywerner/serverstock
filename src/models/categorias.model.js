import startConnection from "../config/database.js"

const categoria_model = {
    getAllCategorias: async () => {

        const select = `SELECT * FROM categorias`

        const connection = await startConnection()

        const [results] = await connection.query(select)
       
        return results
    }
    
}


export default categoria_model