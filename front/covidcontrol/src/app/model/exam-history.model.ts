
import { Deserealizable } from './deserealize.model';

export class ExamHistory implements Deserealizable {

    private id: number;
    private idCitizen: number;
    private name: string;
    private lastname: string;
    private date: Date;
    private time: string;
    private result: string;

    constructor() {}

    deserealize(data: any): this {
        this.id = data['id'];
        this.idCitizen = data['idCitizen'];
        this.name = data['name'];
        this.lastname = data['lastname'];
        this.date = data['date'];
        this.time = data['time'];
        this.result = data['result'];
        return this;
    }

    public getId(): number {
        return this.id;
    }

    public getIdCitizen(): number {
        return this.idCitizen;
    }

    public getName(): string {
        return this.name;
    }

    public getLastname(): string {
        return this.lastname;
    }

    public getDate(): Date {
        return this.date;
    }

    public getTime(): string {
        return this.time;
    }

    public getResult(): string {
        return this.result;
    }
}