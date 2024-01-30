

const errorGlobalMiddleware = (err, req, res) => { //Este enfoque capta todos los errores que tenga un "identidad declarada"
    const codigo = err.code || 500
    console.log(`Status code : ${codigo}`)
    console.error(err.stack)
    res.status(parseInt(codigo)).json({ message: err.message, code: codigo, tipo: err.name });
}


export default errorGlobalMiddleware