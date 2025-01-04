import { Product } from "../../Domain/product";
import { ProductRepository } from "../../Domain/product-repository";

export class GetAllProducts {
    constructor(private readonly productRepository: ProductRepository) { }

    public async execute(): Promise<Product[]> {
        return await this.productRepository.findAll();
    }
}