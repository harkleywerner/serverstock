import pool from "../config/database.js"

const sucursales_model = {


    getsucursales: async () => {
        const select = `SELECT * FROM sucursales`

        const connection = await pool

        const [results] = await connection.query(select)

        return results

    },

    logginSucursal: async (req) => {

        const {contraseña,id_sucursal} = req.body

        const select = `SELECT 1 FROM sucursales WHERE id_sucursal = ? AND contraseña = ? `

        const connection = await pool

        const [results] = await connection.query(select, [id_sucursal, contraseña])

        return results
    }
}


export default sucursales_model

