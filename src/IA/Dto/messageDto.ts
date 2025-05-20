class MessageDto{
    private _message: string;

    constructor(message:string){
        this._message= message;
    }

    //getter
    get message(): string {
        return this._message;
    }
    //setter
    set message(message:string){
        this._message = message;
    }
}

export default MessageDto