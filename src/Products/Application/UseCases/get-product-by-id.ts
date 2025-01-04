import { Product } from "../../Domain/product";
import { ProductRepository } from "../../Domain/product-repository";

export class GetProductById {
    constructor(private readonly productRepository: ProductRepository) {}

    public async execute(productId: string): Promise<Product | null> {
        return await this.productRepository.findById(productId);
    }
}