export class ProductId {
    private readonly id: string;

    private constructor(id: string) {
        this.id = id;
    }

    public static create(id: string): ProductId {
        if (!id || typeof id !== 'string') {
            throw new Error('Invalid Product ID');
        }
        return new ProductId(id);
    }

    public get value(): string {
        return this.id;
    }
}