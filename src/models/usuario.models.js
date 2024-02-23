import pool from "../config/database.js"

const usuarios_model = {

        getUsuarios: async () => {
                const select = `SELECT * FROM usuarios WHERE estado = "activo"`

                const connection = await pool

                const [results] = await connection.query(select)

                return results

        },

        logginUsuario: async (req) => {

                const id_usuario = req.body.id_usuario

                const contraseña = req.body.contraseña

                const select = `SELECT * FROM usuarios WHERE id_usuario = ? AND contraseña = ? `

                const connection = await pool

                const [results] = await connection.query(select, [id_usuario, contraseña])

                return results
        },
}


export default usuarios_model

