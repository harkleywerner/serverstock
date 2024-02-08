const concatenarClausulasUtils = ({
    clausulas = {}, // Define la estructura de las clausulas, las propiedad se tienen que llamar de la misma forma que las del req.body.
    lista = {} //Esto seria el req.body de lo que llega.
}) => {

    const params = []

    let select = ""

    for (const key in clausulas) {

        if (lista[key] !== undefined) {
            select +=  "" + clausulas[key]
            params.push(lista[key])
        }
    }

    return [params, select]
}
export default concatenarClausulasUtils