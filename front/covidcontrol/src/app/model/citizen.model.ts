
import { User } from './user.model';

export class Citizen extends User {

    private gender: string;
    private lastname: string;

    constructor() {
        super();
    }

    public deserealize(data: any): this {
        super.deserealize(data);
        this.gender = data['gender'];
        this.lastname = data['lastname'];
        return this;
    }

    public getGender(): string {
        return this.gender;
    }

    public getLastname(): string {
        return this.lastname;
    }
}