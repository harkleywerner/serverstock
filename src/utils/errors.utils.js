export class DataBaseError extends Error {
    constructor(message, code) {
        super(message)
        this.name = "DataBaseError"
        this.code = code
    }
}


export class BackEndError extends Error {
    constructor(message,code) {
        super(message)
        this.name = "BackEndError"
        this.code = code
    }
}
