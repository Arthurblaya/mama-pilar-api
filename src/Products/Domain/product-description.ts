export class ProductDescription {
    private readonly description: string;

    private constructor(description: string) {
        this.description = description;
    }

    public static create(description: string): ProductDescription {
        if (!description || typeof description !== 'string' || description.trim().length < 10) {
            throw new Error('Product description must be at least 10 characters long');
        }
        return new ProductDescription(description);
    }

    public get value(): string {
        return this.description;
    }
}