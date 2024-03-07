import pool from "../config/database.js"

const usuarios_model = {

        getUsuarios: async (req) => {

                const { sucursal_info = {} } = req.session

                const { id_sucursal } = sucursal_info

                const select = `SELECT * FROM usuarios WHERE estado = "activo" AND  id_sucursal = ?`

                const connection = await pool

                const [results] = await connection.query(select, [id_sucursal])

                return results

        },

        logginUsuario: async (req) => {

                const { id_usuario, contraseña } = req.body

                const { sucursal_info = {} } = req.session

                const { id_sucursal } = sucursal_info

                const select = `SELECT * FROM usuarios WHERE id_usuario = ? AND contraseña = ? AND id_sucursal = ? `

                const connection = await pool

                const [results] = await connection.query(select, [id_usuario, contraseña, id_sucursal])

                return results
        },
}


export default usuarios_model

