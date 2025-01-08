import { ProductRepository } from "../../Domain/product-repository";
import { StorageService } from "../Servicves/storage-service";

export class DeleteProduct {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly storageService: StorageService
    ) { }

    public async execute(productId: string): Promise<void> {
        const product = await this.productRepository.findById(productId);
        if (!product) {
            throw new Error(`Product with ID ${productId} does not exist.`);
        }
        const folderKey = `${productId}`;
        try {
            await this.storageService.deleteAllFiles(folderKey);
        } catch (error) {
            console.error(`Error deleting images for product ${productId}:`, error);
        }
        await this.productRepository.delete(productId);
    }
}
