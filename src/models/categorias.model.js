import pool from "../config/database.js"

const categoria_model = {
    getAllCategorias: async () => {

        const select = `SELECT * FROM categorias`

        const connection = await pool

        const [results] = await connection.query(select)
       
        return results
    }
    
}


export default categoria_model
