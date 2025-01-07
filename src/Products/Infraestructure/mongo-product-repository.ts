import { ProductRepository } from "../Domain/product-repository";
import { Product } from "../Domain/product";
import { Collection, Db, ObjectId } from "mongodb";

export class MongoProductRepository implements ProductRepository {
    private readonly collection: Collection;

    constructor(db: Db) {
        this.collection = db.collection("products");
    }

    async save(product: Product): Promise<void> {
        const document = {
            _id: product.productId,
            name: product.productName,
            category: product.productCategory,
            price: product.productPrice,
            images: product.productImages,
            description: product.productDescription,
        };
        await this.collection.insertOne(document as any);
    }

    async findById(productId: string): Promise<Product | null> {
        const document = await this.collection.findOne({ _id: new ObjectId(productId) });
        if (!document) return null;

        return Product.reconstruct(
            document._id.toString(),
            document.name,
            document.category,
            document.price,
            document.images,
            document.description
        );
    }

    async findAll(): Promise<Product[]> {
        const documents = await this.collection.find().toArray();
        return documents.map((doc) =>
            Product.reconstruct(
                doc._id.toString(),
                doc.name,
                doc.category,
                doc.price,
                doc.images,
                doc.description
            )
        );
    }

    async update(productId: string, updates: Record<string, any>): Promise<void> {
        const validatedUpdates: Record<string, any> = {};
        for (const [key, value] of Object.entries(updates)) {
            validatedUpdates[key] = Product.validateProp(key, value);
        }

        await this.collection.updateOne(
            { _id: new ObjectId(productId) },
            { $set: validatedUpdates }
        );
    }

    async delete(productId: string): Promise<void> {
        const result = await this.collection.deleteOne({ _id: new ObjectId(productId) });
        if (result.deletedCount === 0) {
            throw new Error(`Product with ID ${productId} does not exist.`);
        }
    }
}
