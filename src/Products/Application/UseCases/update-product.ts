import { ProductRepository } from "../../Domain/product-repository";

export class UpdateProduct {
    constructor(private readonly productRepository: ProductRepository) { }

    public async execute(
        productId: string,
        updates: Record<string, any>
    ): Promise<void> {
        if (!productId || Object.keys(updates).length === 0) {
            throw new Error(
                "Invalid input: Product ID or update data is missing."
            );
        }

        await this.productRepository.update(productId, updates);
    }
}