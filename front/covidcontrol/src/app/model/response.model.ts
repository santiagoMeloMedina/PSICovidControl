
export class Response {

    private code;
    private response;

    constructor(data: Object){
        this.code = data['code'];
        this.response = data['response'];
    }

    public getCode(): number {
        return this.code;
    }

    public getResponse(): Object {
        return this.response;
    }
}