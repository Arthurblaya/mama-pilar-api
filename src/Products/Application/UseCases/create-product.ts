import { Product } from "../../Domain/product";
import { ProductRepository } from "../../Domain/product-repository";

export class CreateProduct {
    constructor(private readonly productRepository: ProductRepository) {}

    public async execute(product: Product): Promise<void> {
        await this.productRepository.save(product);
    }
}