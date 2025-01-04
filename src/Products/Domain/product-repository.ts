import { Product } from './product';

export interface ProductRepository {
    save(product: Product): Promise<void>;
    findById(productId: string): Promise<Product | null>;
    findAll(): Promise<Product[]>;
    update(productId: string, productPartial: Partial<Product>): Promise<void>;
    delete(productId: string): Promise<void>;
}