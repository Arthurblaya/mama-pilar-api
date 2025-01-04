export class ProductPrice {
    private readonly price: number;

    private constructor(price: number) {
        this.price = price;
    }

    public static create(price: number): ProductPrice {
        if (price <= 0 || isNaN(price)) {
            throw new Error('Invalid Product Price');
        }
        return new ProductPrice(price);
    }

    public get value(): number {
        return this.price;
    }
}