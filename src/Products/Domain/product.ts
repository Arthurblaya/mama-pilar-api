import { ProductId } from "./product-id";
import { ProductName } from "./product-name";
import { ProductCategory } from "./product-category";
import { ProductPrice } from "./product-price";
import { ProductImages } from "./product-images";
import { ProductDescription } from "./product-description";
import { v4 as uuidv4 } from "uuid";
import { ProductBinaryImage } from "./product-binary-image";

export class Product {
    private readonly id: ProductId;
    private readonly name: ProductName;
    private readonly category: ProductCategory;
    private readonly price: ProductPrice;
    private readonly images: ProductImages;
    private readonly description: ProductDescription;

    private constructor(
        id: ProductId,
        name: ProductName,
        category: ProductCategory,
        price: ProductPrice,
        images: ProductImages,
        description: ProductDescription
    ) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.images = images;
        this.description = description;
    }

    public static create(
        name: string,
        category: string[],
        price: number,
        images: string[],
        description: string
    ): Product {
        return new Product(
            ProductId.create(uuidv4()),
            ProductName.create(name),
            ProductCategory.create(category),
            ProductPrice.create(price),
            ProductImages.create(images),
            ProductDescription.create(description)
        );
    }

    public static reconstruct(
        id: string,
        name: string,
        category: string[],
        price: number,
        images: string[],
        description: string
    ): Product {
        return new Product(
            ProductId.create(id),
            ProductName.create(name),
            ProductCategory.create(category),
            ProductPrice.create(price),
            ProductImages.create(images),
            ProductDescription.create(description)
        );
    }

    public static validateProp(key: string, value: any): any {
        switch (key) {
            case "name":
                return ProductName.create(value).value;
            case "category":
                return ProductCategory.create(value).value;
            case "price":
                return ProductPrice.create(value).value;
            case "images":
                return ProductImages.create(value).value;
            case "description":
                return ProductDescription.create(value).value;
            default:
                throw new Error(`Invalid property: ${key}`);
        }
    }

    public static validateBinaryImages(images: Buffer[]): boolean {
        try {
            images.forEach((image) => ProductBinaryImage.create(image));
            return true;
        } catch (error) {
            return false;
        }
    }

    public get productId(): string {
        return this.id.value;
    }

    public get productName(): string {
        return this.name.value;
    }

    public get productCategory(): string[] {
        return this.category.value;
    }

    public get productPrice(): number {
        return this.price.value;
    }

    public get productImages(): string[] {
        return this.images.value;
    }

    public get productDescription(): string {
        return this.description.value;
    }
}
