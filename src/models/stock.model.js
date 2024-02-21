import startConnection from "../config/database.js"
import concatenarClausulasUtils from "../utils/concatenar_clausulas.utils.js"
import { DataBaseError } from "../utils/errors.utils.js"
import detalle_de_stock_model from "./detalle_de_stock.model.js"

const stock_model = {

    getUltimoStock: async () => {

        const selectUltimoStock = //Este enfoque sirve para seleccionar el ultimo stock, en caso de que no se indique un id
            `    
        SELECT id_stock,lote FROM stock
        ORDER BY  id_stock DESC
        LIMIT 1
        `
        const connection = await startConnection()

        const [results] = await connection.query(selectUltimoStock)

        return results

    },

    getStockByIdProducto: async (req) => {

        let select = `
        SELECT
        s.id_stock,
        s.lote
       FROM stock s
       INNER JOIN detalle_de_stock ds 
       ON ds.id_stock = s.id_stock 
        `
        const connection = await startConnection()

        const clausulas = {
            id_producto: "WHERE ds.id_producto = ?",
            lote: "AND s.lote LIKE CONCAT( ?, '%')",
            offset: "LIMIT 15 OFFSET ?"
        }

        const lista = { ...req.body, offset: parseInt(req.body.offset) }

        const [params, selectRestante] = concatenarClausulasUtils({ clausulas, lista })

        select += selectRestante

        const [results] = await connection.query(select, [...params])

        return results

    },

    getAllStocks: async (req) => {

        let select = `
        SELECT k.id_stock,
        k.lote,
        k.fecha,
        COALESCE(s.total_absoluto,0) AS total_absoluto,
        COALESCE(s.total_absoluto,0) - COALESCE(t.total_transacciones,0) AS total_relativo
        FROM stock k
        LEFT JOIN (
        SELECT SUM(cantidad) AS total_absoluto , id_stock
        FROM detalle_de_stock
        GROUP BY id_stock
        ) s ON s.id_stock = k.id_stock 
        LEFT JOIN (
        SELECT SUM(cantidad) AS total_transacciones, id_stock 
        FROM transsaciones
        GROUP BY id_stock
        ) t ON t.id_stock = s.id_stock
        WHERE k.lote >= 0
        `
        const clausulas = {
            search: "AND k.lote LIKE CONCAT( ?, '%')",
            offset: "GROUP BY k.id_stock LIMIT 15 OFFSET ?"
        }

        const [params, selectRestante] = concatenarClausulasUtils({ clausulas, lista: { ...req.query, offset: parseInt(req.query.offset) } })

        select += selectRestante

        const connection = await startConnection()

        const [results] = await connection.query(select, [...params])

        return results
    },

    addStock: async (req, next) => {

        const { usuarios_id = 1, id_sucursal = 1, listaDeNuevoStock } = req.body;

        const insert = "INSERT INTO stock (id_usuario,id_sucursal,lote) VALUES (?,?,?)";

        const ultimaStock = "SELECT ABS(COUNT(*) + 1) as lote FROM stock WHERE id_sucursal = ?" //Este enfoque sirve para determinar que numero de lote es


        let connection;

        try {
            connection = await startConnection().getConnection();

            await connection.beginTransaction();

            const [[{ lote }]] = await connection.query(ultimaStock, [1])

            const [{ insertId }] = await connection.query(insert, [usuarios_id, id_sucursal, lote]);

            for (const producto of listaDeNuevoStock) {
                await detalle_de_stock_model.addDetalleDeStock({ connection, id_stock: insertId, producto })
            }

            await connection.commit()

            return {
                lote
            }

        } catch (error) {

            next(error)

            await connection.rollback();

        } finally {
            if (connection) await connection.release();
        }
    },

    updateStock: async (req, next) => {

        const { id_stock, lista_de_cambios } = req.body

        const update = "UPDATE stock SET ultima_edicion = NOW() WHERE id_stock = ?"

        const verificarTranssacionesPUT = `
        SELECT SUM(cantidad) as cantidad,id_stock
        FROM transsaciones
        WHERE id_producto = ? and id_stock = ?
        GROUP BY id_stock
        `

        const verificarTranssacionesDELETE = `
        SELECT d.cantidad_stock  as cantidad_stock ,
        COALESCE(t.cantidad_transsacion,0) as cantidad_transsacion
        FROM (
       SELECT SUM(cantidad) as cantidad_stock,id_stock,id_producto
       FROM detalle_de_stock
       WHERE id_producto = ?
       GROUP BY id_stock
       ) as d
       LEFT JOIN (
       SELECT SUM(cantidad) as cantidad_transsacion,id_stock,id_producto
       FROM transsaciones
       WHERE id_producto = ?
       GROUP BY id_stock
       ) t ON t.id_stock = d.id_stock
       WHERE d.id_stock = ?
       GROUP BY d.id_stock
        `
        const failed_commit = {
            "put": {},
            "delete": {}
        }
        const success_commit = {
            "put": {},
            "post": [],
            "delete": []
        }

        const verificarProductoEnStock = "SELECT 1 FROM detalle_de_stock WHERE id_producto = ? AND id_stock = ? "

        let connection;
        try {
            connection = await startConnection().getConnection()

            await connection.beginTransaction()

            for (const producto of lista_de_cambios) {

                const { id_producto, accion, cantidad, nombre } = producto

                if (accion == "post") {

                    const [res] = await connection.query(verificarProductoEnStock, [id_producto, id_stock])

                    if (res.length > 0) throw new DataBaseError(`El producto [${nombre}] ya se encuentra en el stock`, 422)

                    const { insert_id } = await detalle_de_stock_model.addDetalleDeStock({ producto, connection, id_stock })

                    success_commit["post"] = [...success_commit["post"], { ...producto, id_detalle_de_stock: insert_id }]

                } else if (accion == "put") {

                    const [res] = await connection.query(verificarTranssacionesPUT, [id_producto, id_stock, cantidad])

                    if (res[0]?.cantidad > cantidad) {
                        failed_commit["put"] = { ...failed_commit["put"], [id_producto]: { ...producto, cantidad: parseInt(res[0].cantidad) } }
                    } else {
                        await detalle_de_stock_model.updateDetalleDeStock({ producto, connection, id_stock })
                        success_commit["put"] = { ...success_commit["put"], [id_producto]: producto }
                    }
                } else {

                    const [res] = await connection.query(verificarTranssacionesDELETE, [id_producto, id_producto, id_stock])

                    const { cantidad_stock, cantidad_transsacion } = res[0] || {}

                    if ((cantidad_stock - cantidad) < cantidad_transsacion && res.length !== 0) {
                        failed_commit["delete"] = { ...failed_commit["delete"], [id_producto]: producto }
                    }
                    else {
                        await detalle_de_stock_model.removeDetalleDeStock({ producto, connection })
                        success_commit["delete"] = [...success_commit["delete"], id_producto]
                    }
                }

            }

            await connection.query(update, [id_stock])

            await connection.commit()

            return {
                tipo: "success",
                failed_commit,
                success_commit
            }

        } catch (error) {
            await connection.rollback()
            next(error)
        }
        finally {
            if (connection) await connection.release()
        }

    }
}


export default stock_model