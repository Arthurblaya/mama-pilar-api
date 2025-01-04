import { ProductRepository } from "../../Domain/product-repository";

export class DeleteProduct {
    constructor(private readonly productRepository: ProductRepository) {}

    public async execute(productId: string): Promise<void> {
        await this.productRepository.delete(productId);
    }
}