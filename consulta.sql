SELECT
       s.id_producto,
        GREATEST(COALESCE(SUM(s.cantidad), 0) - COALESCE(SUM(t.cantidad), 0),0) as cantidad_total,
        -COALESCE(SUM(t.cantidad),0)  as devoluciones_permitidas
        FROM (
        SELECT id_producto,SUM(cantidad) as cantidad 
        FROM detalle_de_stock
        WHERE id_stock = 250 AND id_producto = 1
        GROUP BY id_producto
        ) AS s
        LEFT JOIN (
        SELECT id_producto,SUM(cantidad) as cantidad 
        FROM transsaciones
        WHERE id_stock = 250 AND id_producto = 1
        GROUP BY id_producto
        ) t ON t.id_producto = s.id_producto
        GROUP BY s.id_producto