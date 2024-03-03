import session from "express-session"

const sucursalSessionMiddleware = () => {
    return session({ //=> Esta session se encarga de mantener el estado de la sucursal.
        secret: 'stock-1bsf-456g-aff',
        resave: false,
        saveUninitialized: true,
        cookie: {
            // secure : true,//Si establezco esto como true quiere decir que solo acepta solicuted HTTPS
            httpOnly: false,
            maxAge: 60 * 1000 * 60 * 24 //=> 24 horas
        },
    })

}

export default sucursalSessionMiddleware