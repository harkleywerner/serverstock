export class DataBaseError extends Error {
    constructor(message, code) {
        super(message)
        this.name = "DataBaseError"
        this.code = code
    }
}

export class FrontError extends Error {
    constructor(message) {
        super(message)
        this.name = "FrontError"
    }
}
