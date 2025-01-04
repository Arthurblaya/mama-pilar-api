import { ProductId } from './product-id';
import { ProductName } from './product-name';
import { ProductCategory } from './product-category';
import { ProductPrice } from './product-price';
import { ProductImages } from './product-images';
import { ProductDescription } from './product-description';

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
        id: string,
        name: string,
        category: string[],
        price: number,
        images: string[],
        description: string
    ): Product {
        try {
            return new Product(
                ProductId.create(id),
                ProductName.create(name),
                ProductCategory.create(category),
                ProductPrice.create(price),
                ProductImages.create(images),
                ProductDescription.create(description)
            );
        } catch (error) {
            throw new Error(`Error creating Product: ${(error as Error).message}`);
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
