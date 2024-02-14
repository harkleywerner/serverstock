import startConnection from "../config/database.js"
import { DataBaseError } from "../utils/errors.utils.js"

const detalle_de_stock_model = {

    getDetallesDeStock: async (req) => {

        const { id_stock, offset = 0 } = req.body

        const select = `SELECT * FROM detalle_de_stock WHERE id_stock = ? LIMIT 15 OFFSET  ?`

        const connection = await startConnection()

        const [results] = await connection.query(select, [id_stock, offset])

        return results
    },


    getUltimoDetalleDeStock: async (req) => {
        const select = `
        SELECT
         s.id_detalle_de_stock,
         s.cantidad,
         p.nombre as nombre,
         p.id_producto,
         c.nombre as categoria
    FROM detalle_de_stock  s INNER JOIN
    productos p  ON s.id_producto = p.id_producto
    INNER JOIN categorias c ON c.id_categoria = p.id_categoria
    WHERE s.id_stock =(SELECT MAX(id_stock) FROM stock) LIMIT 15 

        `

        const connection = await startConnection()

        const [results] = await connection.query(select)


        return results
    },

    updateDetalleDeStock: async ({ connection, producto }) => {

        try {

            const { cantidad, id_producto, id_detalle_de_stock } = producto

            const update = "UPDATE detalle_de_stock SET cantidad = ?, ultima_edicion = NOW() WHERE id_detalle_de_stock = ?  "

            const [results] = await connection.query(update, [Math.abs(cantidad), id_detalle_de_stock])

            return results

        } catch (error) {
            if (error?.errno == 1452) {
                throw new DataBaseError("Algun producto del que intentas editar no se encuentra disponible.", 422)
            } else {
                throw error
            }
        }
    },

    addDetalleDeStock: async ({ producto, connection, id_stock, }) => {
        try {
            const insertDetalles = "INSERT INTO detalle_de_stock (cantidad,id_producto,id_stock) VALUES(?,?,?)";

            const { id_producto, cantidad } = producto;

            await connection.query(insertDetalles, [cantidad, id_producto, id_stock]);

        } catch (error) {

            if (error?.errno == 1452) {
                throw new DataBaseError("Algun producto del que intentas ingresar no se encuentra disponible.", 422)
            } else {
                throw error
            }
        }
    },

    removeDetalleDeStock: async ({ producto, connection }) => {


        try {
            const deletDetalles = "DELETE FROM  detalle_de_stock WHERE id_detalle_de_stock = ?";

            const { id_detalle_de_stock } = producto;

            await connection.query(deletDetalles, [id_detalle_de_stock]);

        } catch (error) {

            if (error?.errno == 1452) {
                throw new DataBaseError("Algun producto del que intentas eliminar no se encuentra disponible.", 422)
            } else {
                throw error
            }
        }
    }
}


export default detalle_de_stock_model