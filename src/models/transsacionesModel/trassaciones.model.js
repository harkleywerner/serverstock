import pool from "../../config/database.js"
import validations from "./transsaciones_model.validations.js"

const trassaciones_model = {

    addTranssacion: async (req, next) => { //Modularizar logica

        const { cantidad, id_producto, id_stock } = req.body

        const verificarCantidad = Math.sign(cantidad) == -1

        let connection;

        try {
            connection = await pool.getConnection()

            await connection.beginTransaction()

            let restante = Math.abs(cantidad)

            while (restante > 0 ) {

                const {
                    total_stock,
                    devoluciones_permitidas,
                    id_stock_actual,
                    verificacionLength
                } = await validations.validationAddStock({ connection, id_producto, cantidad, id_stock })

                if (verificacionLength) {
                    const insert = "INSERT INTO transsaciones (cantidad,id_producto,id_sucursal,id_usuario,id_stock) VALUES(?,?,?,?,?)"

                    const transsacionPositiva = restante > total_stock ? total_stock : restante

                    const trassacionNegativa = restante > devoluciones_permitidas ? devoluciones_permitidas : restante

                    const verificacion = verificarCantidad ? -trassacionNegativa : transsacionPositiva

                    await connection.query(insert, [verificacion, id_producto, 1, 1, id_stock_actual])

                    restante -= Math.abs(verificacion)
                } else {
                    restante = 0
                }
            }

            await connection.commit()

            return {
                tipo: "success",
                data: { cantidad: Math.abs(cantidad) - restante }, //Arreglar esto de los mensajes
            }


        } catch (error) {
            next(error)
            await connection.rollback()
        }
        finally {
            if (connection) await connection.release()
        }
    },



}


export default trassaciones_model