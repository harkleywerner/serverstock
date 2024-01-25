import getConnection from "../config/database.js"

const usuarios_model = {

    getUsuarios: async (req, res) => {
        const insert = `SELECT * FROM usuarios`

        const connection = await getConnection()

        const [results] = await connection.query(insert)

        return results
    },



}


export default usuarios_model

