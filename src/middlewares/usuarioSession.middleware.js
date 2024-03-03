import session from "express-session"

const usuarioSessionMiddleware = () => {

    return session({ //=> Esta session se encarga de mantener el estado del usuario previamnte logeado en la sucursal.
        secret: 'stock-1bsf-456g-aff-usuario',
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: false,
            maxAge: 60 * 1000 * 15 //=> 15 minutos
        },
    })

}

export default usuarioSessionMiddleware