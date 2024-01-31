import startConnection from "../config/database.js"
import concatenarClausulasUtils from "../utils/concatenar_clausulas.utils.js"

const productos_model = {

    getAllProductos: async (req) => {

        const { fila_incial = 0 } = req.body

        let select = `SELECT
        p.id_producto,
        p.nombre,
        COALESCE(SUM(s.cantidad), 0) - COALESCE(SUM(t.cantidad), 0) as cantidad_total,
        -COALESCE(SUM(t.cantidad),0)  as devoluciones_permitidas
        FROM productos p
        LEFT JOIN detalle_de_stock s ON p.id_producto = s.productos_id
        LEFT JOIN transsaciones t ON p.id_producto = t.productos_id
        WHERE p.estado = "activo"
        `
        const clausulas = {
            search: "AND nombre LIKE CONCAT( ?, '%') ",
            categoria: "AND categorias_id = ?",
            fila_incial: "GROUP BY p.id_producto LIMIT 15 OFFSET ?"
        }

        const lista = { ...req.query, fila_incial }

        const [params, selectRestante] = concatenarClausulasUtils({ clausulas, lista })

        select += selectRestante

        const connection = await startConnection()

        const [results] = await connection.query(select, params)

        return results
    },

    getProducto: async (req) => {
        const { search } = req.query

        const connection = await startConnection()

        const select = "SELECT nombre,id_producto FROM productos WHERE nombre LIKE CONCAT(?,'%')"

        const [results] = await connection.query(select, [search])

        return results
    }
}


export default productos_model