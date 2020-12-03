
import { User } from './user.model';

export class ES extends User {

    private totalCap: number;
    private totalDocts: number;
    private totalRes: number;
    private totalBeds: number;

    constructor() {
        super();
    }

    public deserealize(data: any): this {
        super.deserealize(data);
        this.totalCap = data['totalCap'];
        this.totalDocts = data['totalDocts'];
        this.totalRes = data['totalRes'];
        this.totalBeds = data['totalBeds'];
        return this;
    }

    public getTotalCap(): number {
        return this.totalCap;
    }

    public getTotalDocts(): number {
        return this.totalDocts;
    }

    public getTotalRes(): number {
        return this.totalRes;
    }

    public getTotalBeds(): number {
        return this.totalBeds;
    }

}