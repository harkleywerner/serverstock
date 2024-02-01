

const errorGlobalMiddleware = (err, req, res, next) => { //Este enfoque capta todos los errores que tenga un "identidad declarada"
    
  
    const codigo = err.code !== undefined && !isNaN(err.code) ? err.code : 500
    console.log(`Status code : ${codigo}`)
    console.error(err.stack)
    res.status(parseInt(codigo)).json({ message: err.message, code: codigo, tipo: err.name });
}


export default errorGlobalMiddleware