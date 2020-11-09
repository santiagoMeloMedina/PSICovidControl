
import { Deserealizable } from '../deserealize.model';

export class DocumentType implements Deserealizable {

    private id: number;
    private name: string;

    constructor() {}

    deserealize(data: any): this {
        this.id = data['id'];
        this.name = data['name'];
        return this;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }
}