import startConnection from "../config/database.js"
import concatenarClausulasUtils from "../utils/concatenar_clausulas.utils.js"

const productos_model = {

    getAllProductos: async (req) => {

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
            search: "AND nombre LIKE CONCAT( ?, '%')",
            categoria: "AND categorias_id = ?",
            offset: "GROUP BY p.id_producto LIMIT 15 OFFSET ?"
        }

        const lista = { ...req.query, offset: parseInt(req.query.offset || 0) }

        const [params, selectRestante] = concatenarClausulasUtils({ clausulas, lista })

        select += selectRestante
 
        const connection = await startConnection()

        const [results] = await connection.query(select, params)

        return results
    },

    postObtenerProductos: async (req) => {

        const connection = await startConnection()

        let select = `
        SELECT c.nombre as categoria,c.id_categoria ,p.nombre ,p.id_producto FROM productos p
        INNER JOIN categorias c ON c.id_categoria = p.categorias_id
        WHERE p.estado = "activo"
         `

        const lista = { ...req.body, offset: parseInt(req.body.offset || 0) }

        const clausulas = {
            categoria: "AND categorias_id = ?",
            buscador: "AND p.nombre LIKE CONCAT(?,'%')",
            offset: "LIMIT 15 OFFSET ?"
        }

     
        const [params, selectRestante] = concatenarClausulasUtils({ lista, clausulas })

        select += selectRestante
   
        const [results] = await connection.query(select, [...params])

        return results
    }
}


export default productos_model