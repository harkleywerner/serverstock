import getConnection from "../config/database.js"

const sucursales_model = {


    getsucursales: async () => {
        const select = `SELECT * FROM sucursales`

        const connection = await getConnection()

        const [results] = await connection.query(select)

        return results

    },

    postSucursal: async (req) => {

        const id_sucursal = req.body.id_usuario

        const contraseña = req.body.contraseña

        const select = `SELECT * FROM sucursales WHERE id_sucursal = ? AND contraseña = ? `

        const connection = await getConnection()

        const [results] = await connection.query(select, [id_sucursal, contraseña])

        return results

    }


}


export default sucursales_model

