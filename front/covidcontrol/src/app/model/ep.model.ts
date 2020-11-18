
import { User } from './user.model';

export class EP extends User {

    private totalCap: number;
    private category: string;

    constructor() {
        super();
    }

    public deserealize(data: any): this {
        super.deserealize(data);
        this.totalCap = data['totalCap'];
        this.category = data['category'];
        return this;
    }

    public getTotalCap(): number {
        return this.totalCap;
    }

    public getCategory(): string {
        return this.category;
    }

}