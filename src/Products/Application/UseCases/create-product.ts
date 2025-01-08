import { v4 as uuidv4 } from "uuid";
import { ProductRepository } from "../../Domain/product-repository";
import { StorageService } from "../Servicves/storage-service";
import { Product } from "../../Domain/product";

export class CreateProduct {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly storageService: StorageService
    ) { }

    public async execute(
        name: string,
        category: string[],
        price: number,
        binaryImages: Buffer[],
        mimeTypes: string[],
        description: string
    ): Promise<string> {
        if (!Product.validateBinaryImages(binaryImages)) {
            throw new Error("Invalid images provided");
        }

        const productId = uuidv4();
        const folderKey = `${productId}`;
        const imageUrls: string[] = [];

        try {

            for (let i = 0; i < binaryImages.length; i++) {
                const extension = mimeTypes[i].split("/")[1];
                if (!extension) {
                    throw new Error(`Invalid MIME type: ${mimeTypes[i]}`);
                }
                const key = `${folderKey}/image${i + 1}.${extension}`;
                const url = await this.storageService.uploadFile(binaryImages[i], key, mimeTypes[i]);
                imageUrls.push(url);
            }


            const product = Product.reconstruct(
                productId,
                name,
                category,
                price,
                imageUrls,
                description
            );


            await this.productRepository.save(product);

            return productId;
        } catch (error) {
            console.error(`Error creating product with ID ${productId}:`, error);
            try {
                await this.storageService.deleteAllFiles(folderKey);
                console.log(`All files under ${folderKey} deleted successfully.`);
            } catch (deleteError) {
                console.error(`Failed to delete files under ${folderKey}:`, deleteError);
            }

            throw error;
        }
    }
}
