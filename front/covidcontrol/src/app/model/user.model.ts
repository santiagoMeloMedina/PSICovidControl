
import { Deserealizable } from './deserealize.model';

export class User implements Deserealizable {

    private id: string;
    private email: string;
    private rol: string;
    private docType: string;
    private docNum: number;
    private name: string;
    private state: string;
    private username: string;
    private city: string;
    private department: string;
    private address: string;
    private neighHood: string;
    private phoneNum: number;

    constructor() {}

    deserealize(data: any): this {
        this.id = data['id'];
        this.email = data['email'];
        this.docType = data['docType'];
        this.docNum = data['docNum'];
        this.rol = data['rol'];
        this.name = data['name'];
        this.state = data['state'];
        this.username = data['username'];
        this.city = data['city'];
        this.department = data['department'];
        this.address = data['address'];
        this.neighHood = data['neighHood'];
        this.phoneNum = data['phoneNum'];
        return this;
    }

    public getId(): string {
        return this.id;
    }

    public getEmail(): string {
        return this.email;
    }

    public getRol(): string {
        return this.rol;
    }

    public getDocType(): string {
        return this.docType;
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

    public getAddress(): string {
        return this.address;
    }

    public getNeighborhood(): string {
        return this.neighHood;
    }

    public getPhone(): number {
        return this.phoneNum;
    }

    public isActive(): boolean {
        return this.state == "A";
    }
    
}