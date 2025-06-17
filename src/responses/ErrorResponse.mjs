export class user_error extends Error{
    constructor(message,status){
        super(message)
        this.statusCode = status
    }
}


export class system_error extends Error {
    constructor(message,status) {
        super(message)
        this.statusCode = status
    }
}
