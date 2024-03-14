const detalle_de_stock_model_validaciones = {

    validationAddStock: async ({ cantidad, connection, id_producto, id_sucursal ,id_stock}) => {

        //=> Si se le pasa un id_stock que no le corresponde a su id_sucursal, siempre devolvera un tabla vacia
        //Entonces siempre nos aseguramos de que se ingresen los datos en la sucursal correcta.
        //Y cuando si una cantidad muy elevado o muy baja a la del stock, cuando el bucle este realizando su cicle, va verificando depues de cada transsacion
        //Entonces filtrara los elementos en el HAVING no devolviendo nada, debido a que no quedan productos en base a la transsacion realizadas.
        let select =
            `
            SELECT 
            d.id_stock,
            COALESCE(MAX(d.cantidad),0)- COALESCE(SUM(t.cantidad),0) AS total_stock,
            COALESCE(SUM(t.cantidad),0) as devoluciones_permitidas
            FROM stock s
            LEFT JOIN detalle_de_stock d ON d.id_stock = s.id_stock 
            LEFT JOIN transsaciones
            t ON t.id_producto = d.id_producto AND t.id_stock = d.id_stock
            WHERE s.id_sucursal = ? AND d.id_producto = ? AND s.id_stock = IFNULL(?,s.id_stock)
            GROUP BY d.id_stock   
            HAVING (
            CASE 
            WHEN ? < 0 THEN devoluciones_permitidas > 0
            ELSE total_stock > 0
            END
            )
            ORDER BY CASE
            WHEN ? < 0 THEN d.id_stock END DESC
            LIMIT 1
    `


        const [res] = await connection.query(select, [id_sucursal, id_producto, id_stock, cantidad, cantidad])

        const { total_stock, devoluciones_permitidas, id_stock: id_stock_actual } = res[0] || {}

        return {
            total_stock,
            devoluciones_permitidas,
            id_stock_actual,
        }
    }

}

export default detalle_de_stock_model_validaciones