import { ProductRepository } from "../../Domain/product-repository";
import { StorageService } from "../Servicves/storage-service";

export class UpdateProduct {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly storageService: StorageService
    ) { }

    public async execute(
        productId: string,
        updates: Record<string, any>
    ): Promise<void> {
        if (!productId || Object.keys(updates).length === 0) {
            throw new Error("Invalid input: Product ID or update data is missing.");
        }

        const existingProduct = await this.productRepository.findById(productId);
        if (!existingProduct) {
            throw new Error(`Product with ID ${productId} does not exist.`);
        }

        let updatedImages = existingProduct.productImages;
        if (updates.images) {
            const newImages = updates.images as { buffer: Buffer, mimeType: string }[];

            const folderKey = `${productId}`;
            const mimeTypes = updates.images.map(() => "image/jpeg")

            try {
                await this.storageService.deleteAllFiles(folderKey);
                updatedImages = [];
                for (let i = 0; i < newImages.length; i++) {
                    const extension = mimeTypes[i].split("/")[1];
                    const key = `${folderKey}/image${i + 1}.${extension}`;
                    const url = await this.storageService.uploadFile(
                        newImages[i].buffer,
                        key,
                        newImages[i].mimeType
                    );
                    updatedImages.push(url);
                }
            } catch (error) {
                console.error(`Error handling images for product ${productId}:`, error);
                throw new Error("Failed to update product images.");
            }
        }

        const validatedUpdates: Record<string, any> = {};
        for (const [key, value] of Object.entries(updates)) {
            validatedUpdates[key] = key === "images" ? updatedImages : value;
        }

        await this.productRepository.update(productId, validatedUpdates);
    }
}
