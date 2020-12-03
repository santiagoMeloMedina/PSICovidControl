
import { Deserealizable } from '../deserealize.model';

export class City implements Deserealizable {

    private id: string;
    private departmentId: string;
    private name: string;

    constructor() {}

    deserealize(data: any): this {
        this.id = data['_id'];
        this.departmentId = data['departmentId'];
        this.name = data['name'];
        return this;
    }

    public getId(): string {
        return this.id;
    }

    public getDepartmentId(): string {
        return this.departmentId;
    }

    public getName(): string {
        return this.name;
    }
}