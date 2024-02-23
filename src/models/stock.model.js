import pool from "../config/database.js"
import concatenarClausulasUtils from "../utils/concatenar_clausulas.utils.js"
import detalle_de_stock_model from "./detalleDeStockModel/detalle_de_stock.model.js"

const stock_model = {

    getUltimoStock: async () => {

        const selectUltimoStock = //Este enfoque sirve para seleccionar el ultimo stock, en caso de que no se indique un id
            `    
        SELECT id_stock,lote FROM stock
        ORDER BY  id_stock DESC
        LIMIT 1
        `
        const connection = await pool

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
        const connection = await pool

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

        const connection = await pool

        const [results] = await connection.query(select, [...params])

        return results
    },

    addStock: async (req, next) => {

        const { usuarios_id = 1, id_sucursal = 1, listaDeNuevoStock } = req.body;

        const insert = "INSERT INTO stock (id_usuario,id_sucursal,lote) VALUES (?,?,?)";

        const ultimaStock = "SELECT ABS(COUNT(*) + 1) as lote FROM stock WHERE id_sucursal = ?" //Este enfoque sirve para determinar que numero de lote es


        let connection;

        const failed_commit = { "f_post": [] }

        const success_commit = { "s_post": {} }
        const { f_post } = failed_commit
        const { s_post } = success_commit

        try {
            connection = await pool.getConnection();

            await connection.beginTransaction();

            const [[{ lote }]] = await connection.query(ultimaStock, [1])

            const [{ insertId }] = await connection.query(insert, [usuarios_id, id_sucursal, lote]);

            await detalle_de_stock_model.addDetalleDeStock({ id_stock: insertId, connection, pruductos_post: listaDeNuevoStock, f_post, s_post })

            await connection.commit()

            return {
                lote,
                id_stock: insertId,
                failed_commit,
                success_commit
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

        const { patch, post, delete: remove } = lista_de_cambios


        const update = "UPDATE stock SET ultima_edicion = NOW() WHERE id_stock = ?"


        const failed_commit = {
            f_post: [],
            f_patch: {},
            f_delete: []
        }

        const success_commit = {
            s_post: {},
            s_patch: {},
            s_delete: []
        }

        const { s_delete, s_patch, s_post } = success_commit
        const { f_delete, f_patch, f_post } = failed_commit

        let connection;

        try {
            connection = await pool.getConnection()

            await connection.beginTransaction()

            await detalle_de_stock_model.
                addDetalleDeStock({ connection, id_stock, f_post, s_post, pruductos_post: post })

            await detalle_de_stock_model.
                removeDetalleDeStock({ connection, s_delete, f_delete, productos_delete: remove, id_stock })

            await detalle_de_stock_model.
                updateDetalleDeStock({ connection, pruductos_patch: patch, id_stock, f_patch, s_patch })


            if (Object.keys(success_commit).length > 0) {
                await connection.query(update, [id_stock])
            }
            await connection.commit()

            return {
                success_commit,
                failed_commit
            }
        } catch (error) {
            next(error)
            await connection.rollback()
        }
        finally {
            if (connection) await connection.release()
        }

    }
}


export default stock_model