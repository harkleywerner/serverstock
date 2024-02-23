
const detalle_de_stock_model_validaciones = {

  validationRemoveDetalleDeStock: async ({ id_producto, cantidad, connection, id_stock }) => {

    const select = `
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

    const [res] = await connection.query(select, [id_producto, id_producto, id_stock])

    const { cantidad_stock, cantidad_transsacion } = res[0] || {}

    const verificarSiHayCantidadDisponible = (cantidad_stock - cantidad) < cantidad_transsacion && res.length !== 0

    return verificarSiHayCantidadDisponible
  },

  validationAddDetalleDeStock: async ({ connection, id_stock, id_producto }) => {

    const select = "SELECT 1 FROM detalle_de_stock WHERE id_producto = ? AND id_stock = ?"

    const [res] = await connection.query(select, [id_stock, id_producto])

    const verificarProductoEnStock = res.length > 0

    return verificarProductoEnStock

  },

  validationUpdateDetalleDeStock: async ({ connection, id_producto, id_stock, cantidad }) => {

    const select = `
          SELECT SUM(cantidad) as cantidad,id_stock
          FROM transsaciones
          WHERE id_producto = ? and id_stock = ?
          GROUP BY id_stock
          `

    const [res] = await connection.query(select, [id_producto, id_stock])

    const cantidadTranssacion = res[0]?.cantidad

    const verificarCantidadTranssaciones = cantidadTranssacion > cantidad

    return { verificarCantidadTranssaciones, cantidad_minima: cantidadTranssacion }

  }


};

export default detalle_de_stock_model_validaciones