import { Product } from "./product";

export interface ProductRepository {
    save(product: Product): Promise<void>;
    findById(productId: string): Promise<Product | null>;
    findAll(): Promise<Product[]>;
    update(productId: string, updates: Record<string, any>): Promise<void>;
    delete(productId: string): Promise<void>;
}