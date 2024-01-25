import getConnection from "../config/database.js"


const usuarios_model = {

    getUsuarios: async (req,res) => {
        const insert = `SELECT * FROM usuarios`
        getConnection.query(insert)
    },



}


export default usuarios_model

