
import { Deserealizable } from './deserealize.model';

export class User implements Deserealizable {

    private id: string;
    private rol: string;
    private docNum: number;
    private name: string;
    private state: string;
    private username: string;
    private city: string;
    private department: string;

    constructor() {}

    deserealize(data: any): this {
        this.id = data['id'];
        this.docNum = data['docNum']
        this.rol = data['rol'];
        this.name = data['name'];
        this.state = data['state'];
        this.username = data['username'];
        this.city = data['city'];
        this.department = data['department'];
        return this;
    }

    public getId(): string {
        return this.id;
    }

    public getRol(): string {
        return this.rol;
    }

    public getDocNum(): number {
        return this.docNum;
    }

    public getName(): string {
        return this.name;
    }

    public getState(): string {
        return this.state;
    }

    public getUsername(): string {
        return this.username;
    }

    public getCity(): string {
        return this.city;
    }

    public getDepartment(): string {
        return this.department;
    }

    public isActive(): boolean {
        return this.state == "A";
    }
    
}