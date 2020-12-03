
import { Deserealizable } from './deserealize.model';

export class ExamHistory implements Deserealizable {

    private id: string;
    private esDocNum: number;
    private citizenDocNum: number;
    private name: string;
    private date: Date;
    private time: string;
    private result: string;

    constructor() {}

    deserealize(data: any): this {
        this.id = data['_id'];
        this.esDocNum = data['esDocNum'];
        this.citizenDocNum = data['citizenDocNum'];
        this.name = data['name'];
        this.date = data['date'];
        this.time = data['time'];
        this.result = data['result'];
        return this;
    }

    public getId(): string {
        return this.id;
    }

    public getEsDocNum(): number {
        return this.esDocNum;
    }

    public getCitizenDocNum(): number {
        return this.citizenDocNum;
    }

    public getName(): string {
        return this.name;
    }

    public getDate(): Date {
        return this.date;
    }

    public getTime(): string {
        return this.time;
    }

    public getResult(): string {
        let result: string;
        switch (this.result) {
            case 'N':
                result = "Sin respuesta";
                break;
            case 'A':
                result = "Positivo";
                break;
            case 'I':
                result = "Negativo";
                break;
        }
        return result;
    }
}