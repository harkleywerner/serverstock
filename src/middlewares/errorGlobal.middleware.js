const listaDeErrores = {
    500: "Ocurrio un error en el servidor",
    404 : "Pagina no encontrada",
    400 : "Algo ha ido mal con la peticion."
}

const errorGlobalMiddleware = (err, req, res, next) => {
    console.error(err.stack)
    const codigo = isNaN(err.message) ? 500 : err.message
    res.status(parseInt(codigo)).json({ error: listaDeErrores[codigo] });
}


export default errorGlobalMiddleware