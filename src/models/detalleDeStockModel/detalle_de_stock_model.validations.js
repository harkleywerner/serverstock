
const detalle_de_stock_model_validaciones = {

  validationRemoveDetalleDeStock: async ({ id_producto, connection, id_stock,id_sucursal }) => {

    const select = `
   SELECT COALESCE(SUM(cantidad),0) as cantidad_transsacion 
    FROM stock s
    INNER JOIN transsaciones t ON t.id_stock = s.id_stock 
    WHERE s.id_stock = ? AND t.id_producto = ? AND s.id_sucursal = ?
            `

    const [res] = await connection.query(select, [id_stock, id_producto,id_sucursal])


    const { cantidad_transsacion } = res[0] || {}

    const verificarBorrado = cantidad_transsacion == 0

    return {
      verificarBorrado,
      cantidad_sincronizacion: cantidad_transsacion

    }
  },

  validationAddDetalleDeStock: async ({ connection, id_stock, id_producto, id_sucursal }) => {

    const select = `
    SELECT id_detalle_de_stock 
    FROM stock s
    INNER JOIN detalle_de_stock d ON d.id_stock = s.id_stock 
    WHERE id_producto = ? AND s.id_stock = ? AND s.id_sucursal = ?
    `

    const [res] = await connection.query(select, [id_producto, id_stock, id_sucursal])

    const verificarProductoEnStock = res.length > 0
    const id_detalle_de_stock = res[0]?.id_detalle_de_stock

    return {
      verificarProductoEnStock,
      id_detalle_de_stock
    }

  },

  validationUpdateDetalleDeStock: async ({ connection, id_producto, id_stock, cantidad, id_sucursal }) => {

    const select = `
    SELECT COALESCE(SUM(cantidad),0) as cantidad_transsacion 
    FROM stock s
    INNER JOIN transsaciones t ON t.id_stock = s.id_stock 
    WHERE s.id_stock = ? AND t.id_producto = ? AND s.id_sucursal = ?
          `

    const [res] = await connection.query(select, [id_stock, id_producto, id_sucursal])

    const cantidadTranssacion = res[0]?.cantidad_transsacion

    const verificarCantidadTranssaciones = cantidadTranssacion > cantidad
    //La cantidad siempre tiene que ser <= que cantidadTranssacion.

    return { verificarCantidadTranssaciones, cantidad_sincronizacion: parseInt(cantidadTranssacion) + 1 }

  }


};

export default detalle_de_stock_model_validaciones