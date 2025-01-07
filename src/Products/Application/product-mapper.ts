import { Product } from "../Domain/product";
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
}
