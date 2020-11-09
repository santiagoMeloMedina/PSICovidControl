
import { Deserealizable } from './deserealize.model';

export class EntryHistory implements Deserealizable {

    private id: number;
    private idCitizen: number;
    private idEp: number;
    private date: Date;
    private time: string;
    private temperature: number;
    private mask: string;
    private response: string;
    private description: string;

    constructor() {}

    deserealize(data: any): this {
        this.id = data['id'];
        this.idCitizen = data['idCitizen'];
        this.idEp = data['idEp'];
        this.date = data['date'];
        this.time = data['time'];
        this.temperature = data['temperature'];
        this.mask = data['mask'];
        this.response = data['response'];
        this.description = data['description'];
        return this;
    }

    public getId(): number {
        return this.id;
    }

    public getIdCitizen(): number {
        return this.idCitizen;
    }

    public getIdEp(): number {
        return this.idEp;
    }
        
    public getDate(): Date {
        return this.date;
    }

    public getTime(): string {
        return this.time;
    }

    public getTemperature(): number {
        return this.temperature;
    }

    public getMask(): string {
        return this.mask;
    }

    public getResponse(): string {
        return this.response;
    }

    public getDescription(): string {
        return this.description;
    }
}