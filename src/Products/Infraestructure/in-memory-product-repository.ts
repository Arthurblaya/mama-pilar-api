import { Product } from "../Domain/product";
import { ProductRepository } from "../Domain/product-repository";

export class InMemoryProductRepository implements ProductRepository {
    private products: Map<string, Product> = new Map();

    constructor() {
        this.initializeProducts();
    }

    private initializeProducts(): void {
        const initialProducts = [
            Product.create(
                "Carne de res",
                ["carnicería"],
                10.99,
                ["https://example.com/carne-de-res.jpg"],
                "Carne de res fresca de alta calidad."
            ),
            Product.create(
                "Pollo entero",
                ["carnicería"],
                5.49,
                ["https://example.com/pollo-entero.jpg"],
                "Pollo entero ideal para asados."
            ),
            Product.create(
                "Costillas de cerdo",
                ["carnicería"],
                8.75,
                ["https://example.com/costillas-cerdo.jpg"],
                "Costillas de cerdo perfectas para barbacoa."
            ),
            Product.create(
                "Chorizo artesanal",
                ["carnicería"],
                6.25,
                ["https://example.com/chorizo-artesanal.jpg"],
                "Chorizo artesanal con especias tradicionales."
            ),
        ];

        for (const product of initialProducts) {
            this.products.set(product.productId, product);
        }
    }

    async save(product: Product): Promise<void> {
        this.products.set(product.productId, product);
    }

    async findById(productId: string): Promise<Product | null> {
        return this.products.get(productId) || null;
    }

    async findAll(): Promise<Product[]> {
        return Array.from(this.products.values());
    }

    async update(
        productId: string,
        updates: Record<string, any>
    ): Promise<void> {
        const existingProduct = await this.findById(productId);
        if (!existingProduct) {
            throw new Error(`Product with ID ${productId} does not exist.`);
        }
        const updatedProduct = Product.reconstruct(
            existingProduct.productId,
            updates.name !== undefined ? Product.validateProp("name", updates.name) : existingProduct.productName,
            updates.category !== undefined ? Product.validateProp("category", updates.category) : existingProduct.productCategory,
            updates.price !== undefined ? Product.validateProp("price", updates.price) : existingProduct.productPrice,
            updates.images !== undefined ? Product.validateProp("images", updates.images) : existingProduct.productImages,
            updates.description !== undefined ? Product.validateProp("description", updates.description) : existingProduct.productDescription
        );
        this.products.set(productId, updatedProduct);
    }

    async delete(productId: string): Promise<void> {
        if (!this.products.delete(productId)) {
            throw new Error(`Product with ID ${productId} does not exist.`);
        }
    }
}
