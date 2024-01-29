import startConnection from "../config/database.js"
import concatenarClausulasUtils from "../utils/concatenar_clausulas.utils.js"

const productos_model = {

    getProductos: async (req) => {

        const { fila_incial = 0 } = req.body

        let select = `SELECT * FROM productos WHERE estado IS NULL `

        const clausulas = {
            search: "AND nombre LIKE CONCAT( ?, '%') ",
            categoria_id: "AND categorias_id = ?",
            fila_incial: " LIMIT 15 OFFSET ?"
        }

        const lista = { ...req.query, fila_incial }

        const [params, selectRestante] = concatenarClausulasUtils({ clausulas, lista })

        select += selectRestante


        const connection = await startConnection()

        const [results] = await connection.query(select, params)

        return results
    }
}


export default productos_model