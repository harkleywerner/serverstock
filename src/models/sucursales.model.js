import pool from "../config/database.js"

const sucursales_model = {


    getsucursales: async () => {
        const select = `
        SELECT COUNT(u.id_usuario) as total_usuarios,
        s.id_sucursal,s.nombre
        FROM sucursales s
        INNER join usuarios u ON u.id_sucursal = s.id_sucursal 
        GROUP BY s.id_sucursal
        `

        const connection = await pool

        const [results] = await connection.query(select)

        return results

    },

    logginSucursal: async (req) => {

        const {contraseña,id_sucursal} = req.body

        const select = `SELECT nombre,id_sucursal FROM sucursales WHERE id_sucursal = ? AND contraseña = ? `

        const connection = await pool

        const [results] = await connection.query(select, [id_sucursal, contraseña])


        return results
    }
}


export default sucursales_model

