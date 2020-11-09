
import { Deserealizable } from './deserealize.model';

export class User implements Deserealizable {

    private id: number;
    private rol: string;
    private name: string;
    private lastname: string;
    private state: string;
    private username: string;
    private city: string;
    private department: string;

    constructor() {}

    deserealize(data: any): this {
        this.id = data['id'];
        this.rol = data['rol'];
        this.name = data['name'];
        this.lastname = data['lastname'];
        this.state = data['state'];
        this.username = data['username'];
        this.city = data['city'];
        this.department = data['department'];
        return this;
    }

    public getId(): number {
        return this.id;
    }

    public getRol(): string {
        return this.rol;
    }

    public getName(): string {
        return this.name;
    }

    public getLastname(): string {
        return this.lastname;
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
        return this.state == "Activo";
    }
    
}