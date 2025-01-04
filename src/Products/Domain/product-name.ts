export class ProductName {
    private readonly name: string;

    private constructor(name: string) {
        this.name = name;
    }

    public static create(name: string): ProductName {
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Invalid Product Name');
        }
        return new ProductName(name);
    }

    public get value(): string {
        return this.name;
    }
}