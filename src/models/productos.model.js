import startConnection from "../config/database.js"
import concatenarClausulasUtils from "../utils/concatenar_clausulas.utils.js"

const productos_model = {

    getAllProductos: async (req) => {


        let select = `SELECT
        p.id_producto,
        p.nombre,
        GREATEST(COALESCE(SUM(s.cantidad), 0) - COALESCE(SUM(t.cantidad), 0),0) as cantidad_total,
        -COALESCE(SUM(t.cantidad),0)  as devoluciones_permitidas
        FROM productos p
        LEFT JOIN (
        SELECT id_producto,SUM(cantidad) as cantidad FROM detalle_de_stock
        GROUP BY id_producto
        ) s ON p.id_producto = s.id_producto
        LEFT JOIN (
        SELECT id_producto,SUM(cantidad) as cantidad FROM transsaciones
        GROUP BY id_producto
        ) t ON p.id_producto = t.id_producto
        WHERE p.estado = "activo"
        `
        const clausulas = {
            search: "AND nombre LIKE CONCAT( ?, '%')",
            categoria: "AND id_categoria = ?",
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
        INNER JOIN categorias c ON c.id_categoria = p.id_categoria
        WHERE p.estado = "activo"
         `

        const lista = { ...req.body, offset: parseInt(req.body.offset || 0) }

        const clausulas = {
            categoria: "AND c.id_categoria = ?",
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