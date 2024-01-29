const concatenarClausulasUtils = ({ clausulas, lista }) => {

    const params = []
    let select = ""

    for (const key in clausulas) {

        if (lista[key]) {
            select += clausulas[key]
            params.push(lista[key])
        }
    }

    return [params, select]
}
export default concatenarClausulasUtils