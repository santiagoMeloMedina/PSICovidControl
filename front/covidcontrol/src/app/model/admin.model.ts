
import { User } from './user.model';

export class Admin extends User {

    private lastname: string;

    constructor() {
        super();
    }

    public deserealize(data: any): this {
        super.deserealize(data);
        this.lastname = data['lastname'];
        return this;
    }

    public getLastname(): string {
        return this.lastname;
    }

}