
import { Deserealizable } from './deserealize.model';

export class EntryHistory implements Deserealizable {

    private id: number;
    private citizenId: number;
    private citizenDocNum: string;
    private epId: number;
    private epDocNum: string;
    private date: Date;
    private time: string;
    private temperature: number;
    private mask: string;
    private response: string;
    private description: string;

    constructor() {}

    deserealize(data: any): this {
        this.id = data['_id'];
        this.citizenId = data['citizenId'];
        this.citizenDocNum = data['citizenDocNum'];
        this.epId = data['epId'];
        this.epDocNum = data['epDocNum'];
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

    public getCitizenId(): number {
        return this.citizenId;
    }

    public getCitizenDocNum(): string {
        return this.citizenDocNum;
    }

    public getEpId(): number {
        return this.epId;
    }

    public getEpDocNum(): string {
        return this.epDocNum;
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