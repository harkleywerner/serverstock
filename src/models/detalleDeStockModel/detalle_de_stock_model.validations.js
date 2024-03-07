
const detalle_de_stock_model_validaciones = {

  validationRemoveDetalleDeStock: async ({ id_producto, connection, id_stock }) => {

    const select = `
    SELECT COALESCE(SUM(cantidad),0) as cantidad_transsaciones 
    FROM transsaciones
    WHERE id_stock = ? AND id_producto = ?
            `

    const [res] = await connection.query(select, [id_stock, id_producto])


    const { cantidad_transsaciones } = res[0] || {}

    const verificarBorrado = cantidad_transsaciones == 0

    return {
      verificarBorrado,
      cantidad_sincronizacion : cantidad_transsaciones

    }
  },

  validationAddDetalleDeStock: async ({ connection, id_stock, id_producto }) => {

    const select = "SELECT 1 FROM detalle_de_stock WHERE id_producto = ? AND id_stock = ?"

    const [res] = await connection.query(select, [id_producto, id_stock])

    const verificarProductoEnStock = res.length > 0

    return verificarProductoEnStock

  },

  validationUpdateDetalleDeStock: async ({ connection, id_producto, id_stock, cantidad }) => {

    const select = `
    SELECT COALESCE(SUM(cantidad),0) as cantidad_transsacion 
    FROM transsaciones
    WHERE id_stock = ? AND id_producto = ?
          `

    const [res] = await connection.query(select, [id_stock, id_producto])

    const cantidadTranssacion = res[0]?.cantidad_transsacion

    const verificarCantidadTranssaciones = cantidadTranssacion > cantidad

    return { verificarCantidadTranssaciones, cantidad_sincronizacion: parseInt(cantidadTranssacion) + 1 }

  }


};

export default detalle_de_stock_model_validaciones