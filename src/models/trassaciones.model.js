import startConnection from "../config/database.js"

const trassaciones_model = {

    addTranssacion: async (req, next) => {

        const { cantidad, id_producto } = req.body

        const verificarCantidad = Math.sign(cantidad) == -1

        let connection;

        try {
            connection = await startConnection().getConnection()

            await connection.beginTransaction()

            let restante = Math.abs(cantidad)

            while (restante > 0) {

                const verificarStock =
                    `
                    SELECT 
                    s.total_cantidad - COALESCE(t.total_transacciones,0) AS total_stock,
                    COALESCE(t.total_transacciones,0) as devoluciones_permitidas,
                    s.id_stock
                    FROM (
                        SELECT id_producto, SUM(cantidad) AS total_cantidad, id_stock
                        FROM detalle_de_stock
                        WHERE id_producto = ?
                        GROUP BY id_stock
                    ) AS s
                    LEFT JOIN (
                        SELECT SUM(cantidad) AS total_transacciones, id_stock 
                        FROM transsaciones
                        WHERE id_producto = ?
                        GROUP BY id_stock
                    ) t ON t.id_stock = s.id_stock
                    HAVING ${verificarCantidad ? "devoluciones_permitidas > 0 ORDER BY t.id_stock DESC" : "total_stock > 0 "}
                    LIMIT 1
                `
                const [res] = await connection.query(verificarStock, [id_producto, id_producto])

                if (res.length == 0) {
                    return {
                        tipo: "warning",
                        data: { cantidad: Math.abs(cantidad) - restante },
                    }
                }

                const { total_stock, devoluciones_permitidas, id_stock } = res[0]

                const insert = "INSERT INTO transsaciones (cantidad,id_producto,id_sucursal,id_usuario,id_stock) VALUES(?,?,?,?,?)"

                const transsacionPositiva = restante > total_stock ? total_stock : restante

                const trassacionNegativa = restante > devoluciones_permitidas ? devoluciones_permitidas : restante

                const verificacion = verificarCantidad ? -trassacionNegativa : transsacionPositiva

                await connection.query(insert, [verificacion, id_producto, 1, 1, id_stock])

                restante -= Math.abs(verificacion)

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