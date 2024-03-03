export const validationUsuarioSessionMiddleware = (req,res,next) => {

    const {id_usuario} = req.session
    if(id_usuario){
        next()
    }else {
        res.status(401).json({tipo : "denied",message : "La session del usuario expiro."})
    }

};