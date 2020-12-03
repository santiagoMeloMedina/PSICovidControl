
import { Deserealizable } from '../deserealize.model';

export class Category implements Deserealizable {

    private id: string;
    private name: string;

    constructor() {}

    deserealize(data: any): this {
        this.id = data['_id'];
        this.name = data['name'];
        return this;
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }
}