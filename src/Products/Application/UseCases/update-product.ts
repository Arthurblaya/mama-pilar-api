import { Product } from "../../Domain/product";
import { ProductRepository } from "../../Domain/product-repository";

export class UpdateProduct {
    constructor(private readonly productRepository: ProductRepository) { }

    public async execute(productId: string, partialProduct: Partial<Product>): Promise<void> {
        if (!productId || Object.keys(partialProduct).length === 0) {
            throw new Error("Invalid input: Product ID or update data is missing.");
        }

        await this.productRepository.update(productId, partialProduct);
    }
}