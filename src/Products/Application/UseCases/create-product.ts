import { Product } from "../../Domain/product";
import { ProductRepository } from "../../Domain/product-repository";

export class CreateProduct {
    constructor(private readonly productRepository: ProductRepository) { }
    public async execute(
        name: string,
        category: string[],
        price: number,
        images: string[],
        description: string
    ): Promise<string> {
        const product = Product.create(name, category, price, images, description);
        await this.productRepository.save(product);
        return product.productId;
    }
}