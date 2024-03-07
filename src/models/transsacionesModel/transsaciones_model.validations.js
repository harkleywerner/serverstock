const detalle_de_stock_model_validaciones = {

    validationAddStock: async ({ cantidad, connection, id_producto, id_stock }) => {

        let select =
            `
            SELECT 
            s.id_stock,
            SUM(s.cantidad) - COALESCE(t.cantidad,0) AS total_stock,
            COALESCE(t.cantidad,0) as devoluciones_permitidas
            FROM detalle_de_stock s
            LEFT JOIN (
            SELECT SUM(cantidad) AS cantidad, id_stock,id_producto 
            FROM transsaciones
            GROUP BY id_stock,id_producto
            ) t ON t.id_stock = s.id_stock AND s.id_producto = t.id_producto
            WHERE s.id_producto = ? AND s.id_stock  = IFNULL(?,s.id_stock)
            GROUP BY s.id_stock
            HAVING (
            CASE 
            WHEN ? < 0 THEN devoluciones_permitidas > 0
            ELSE total_stock > 0
            END
            )
            ORDER BY CASE
            WHEN ? < 0 THEN t.id_stock END DESC
            LIMIT 1
    `

        const [res] = await connection.query(select, [id_producto, id_stock, cantidad, cantidad])

        const { total_stock, devoluciones_permitidas, id_stock: id_stock_actual } = res[0] || {}

        return {
            total_stock,
            devoluciones_permitidas,
            id_stock_actual,
            verificacionLength: res.length > 0
        }
    }

}

export default detalle_de_stock_model_validaciones