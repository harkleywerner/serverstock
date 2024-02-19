//Este enfoque sirve para enviar mensajes al cliente sin interrumpir su ejecuccion.
//En vez de aplicar un throw que dentria toda la ejeccucion del contexto en el que se encuentra, solo mandamos un json para que el front lo reciba.
//Si necesitas enviar un mensaje que detenga la ejeccucion, debes utilizar error.utils.js

const messageClientUtils = (message) => {
    const {

        tipo = "", //=> success,warning,error,info.
        data = {}, //=> cualquier dato que sea relevante en el contexto que se encuentre.
        message = "",

    } = message
    return message
}