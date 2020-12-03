
import { Deserealizable } from '../deserealize.model';

export class Neighborhood implements Deserealizable {

    private id: string;
    private cityId: string;
    private name: string;

    constructor() {}

    deserealize(data: any): this {
        this.id = data['_id'];
        this.cityId = data['cityId'];
        this.name = data['name'];
        return this;
    }

    public getId(): string {
        return this.id;
    }

    public getCityId(): string {
        return this.cityId;
    }

    public getName(): string {
        return this.name;
    }
}