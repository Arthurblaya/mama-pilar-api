import { Product } from "../Domain/product";
import { ProductCategory } from "../Domain/product-category";
import { ProductDescription } from "../Domain/product-description";
import { ProductImages } from "../Domain/product-images";
import { ProductName } from "../Domain/product-name";
import { ProductPrice } from "../Domain/product-price";

interface ProductDTO {
    id: string;
    name: string;
    category: string[];
    price: number;
    images: string[];
    description: string;
}

export class ProductMapper {
    public static toDTO(product: Product): ProductDTO {
        return {
            id: product.productId,
            name: product.productName,
            category: product.productCategory,
            price: product.productPrice,
            images: product.productImages,
            description: product.productDescription,
        };
    }

    public static toDomain(dto: ProductDTO): Product {
        return Product.create(
            dto.id,
            dto.name,
            dto.category,
            dto.price,
            dto.images,
            dto.description
        );
    }

    public static toPartialDomain(dto: ProductDTO): Partial<Product> {
        const partialDomain: any = {};

        if (dto.name !== undefined) {
            partialDomain.name = ProductName.create(dto.name);
        }
        if (dto.category !== undefined) {
            partialDomain.category = ProductCategory.create(dto.category);
        }
        if (dto.price !== undefined) {
            partialDomain.price = ProductPrice.create(dto.price);
        }
        if (dto.images !== undefined) {
            partialDomain.images = ProductImages.create(dto.images);
        }
        if (dto.description !== undefined) {
            partialDomain.description = ProductDescription.create(dto.description);
        }

        return partialDomain;
    }

}
