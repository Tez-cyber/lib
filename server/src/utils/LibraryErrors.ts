export class UnableToSaveUserError extends Error {
    constructor (message: string){
        super(message)
    }
}
export class InvalidUsernameOrPassword extends Error {
    constructor (message: string){
        super(message)
    }
}