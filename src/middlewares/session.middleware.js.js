import session from "express-session"



const sessionMiddleware = () => {
    return session({ //=> Esta session se encarga de mantener el estado de la sucursal.
        name: "sucursalSession",
        secret: 'stock-1bsf-456g-aff',
        resave: false,
        saveUninitialized: true,
        cookie: {
            // secure : true,//Si establezco esto como true quiere decir que solo acepta solicuted HTTPS
            httpOnly: true,
            maxAge: 60 * 1000 * 60 * 24, //=> 24 horas
            sameSite: "strict"
        },
    })

}

export default sessionMiddleware