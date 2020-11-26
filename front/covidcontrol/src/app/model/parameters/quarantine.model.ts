
import { Deserealizable } from '../deserealize.model';

export class Quarantine implements Deserealizable {

    private id: string;
    private days: number;
    private date: Date;

    constructor() {}

    deserealize(data: any): this {
        this.id = data['_id'];
        this.days = data['days'];
        this.date = data['date'];
        return this;
    }

    public getId(): string {
        return this.id;
    }

    public getDays(): number {
        return this.days;
    }

    public getDate(): Date {
        return this.date;
    }
}