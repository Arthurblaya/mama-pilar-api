import { Product } from "../Domain/product";
import { ProductRepository } from "../Domain/product-repository";

export class InMemoryProductRepository implements ProductRepository {
    private products: Map<string, Product> = new Map();

    constructor() {
        const baseProducts = [
            Product.create(
                '1',
                'Botifarra',
                ['Carns', 'Embotits'],
                9.99,
                ['https://example.com/botifarra.jpg'],
                'Botifarra artesana de porc 100% natural.'
            ),
            Product.create(
                '2',
                'Xurrasco',
                ['Carns', 'Vedella'],
                12.49,
                ['https://example.com/xurrasco.jpg'],
                'Talls de xurrasco de vedella ideals per a la brasa.'
            ),
            Product.create(
                '3',
                'Pollastre sencer',
                ['Carns', 'Pollastre'],
                8.75,
                ['https://example.com/pollastre.jpg'],
                'Pollastre sencer criat a l’aire lliure, ideal per rostir.'
            ),
            Product.create(
                '4',
                'Hamburgueses de vedella',
                ['Carns', 'Preparats'],
                6.50,
                ['https://example.com/hamburgueses.jpg'],
                'Hamburgueses de vedella fetes a mà, amb ingredients frescos.'
            ),
            Product.create(
                '5',
                'Costelles de porc',
                ['Carns', 'Porc'],
                7.30,
                ['https://example.com/costelles.jpg'],
                'Costelles de porc fresques, perfectes per a la barbacoa.'
            ),
        ];

        baseProducts.forEach((product) => {
            this.products.set(product.productId, product);
        });
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

    async update(productId: string, productPartial: Partial<Product>): Promise<void> {
        const existingProduct = this.products.get(productId);
        if (!existingProduct) {
            throw new Error(`Product with ID ${productId} does not exist.`);
        }
        const updatedProduct = Product.createPartial(existingProduct, productPartial);
        this.products.set(productId, updatedProduct);
    }

    async delete(productId: string): Promise<void> {
        if (!this.products.delete(productId)) {
            throw new Error(`Product with ID ${productId} does not exist.`);
        }
    }
}
