import { GetAllProducts } from "../UseCases/get-all-products";
import { GetProductById } from "../UseCases/get-product-by-id";
import { CreateProduct } from "../UseCases/create-product";
import { UpdateProduct } from "../UseCases/update-product";
import { DeleteProduct } from "../UseCases/delete-product";
import { HttpRequest } from "../../../Shared/http-request";
import { HttpResponse } from "../../../Shared/http-response";
import { ProductMapper } from "../product-mapper";

export class ProductsController {
    constructor(
        private readonly getAllProducts: GetAllProducts,
        private readonly getProductById: GetProductById,
        private readonly createProduct: CreateProduct,
        private readonly updateProduct: UpdateProduct,
        private readonly deleteProduct: DeleteProduct
    ) { }

    public async getAll(req: HttpRequest, res: HttpResponse): Promise<void> {
        try {
            const products = await this.getAllProducts.execute();
            const productDTOs = products.map(ProductMapper.toDTO);
            res.status(200).json(productDTOs);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    public async getById(req: HttpRequest, res: HttpResponse): Promise<void> {
        try {
            const product = await this.getProductById.execute(req.params?.id || "");
            if (!product) {
                res.status(404).json({ message: "Product not found" });
                return;
            }
            const productDTO = ProductMapper.toDTO(product);
            res.status(200).json(productDTO);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    public async create(req: HttpRequest, res: HttpResponse): Promise<void> {
        try {
            const product = ProductMapper.toDomain(req.body || {});
            await this.createProduct.execute(product);
            res.status(201).json({ message: "Product created successfully" });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    public async update(req: HttpRequest, res: HttpResponse): Promise<void> {
        try {
            const partialProduct = ProductMapper.toPartialDomain(req.body || {});
            await this.updateProduct.execute(req.params?.id || "", partialProduct);
            res.status(200).json({ message: "Product updated successfully" });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    public async delete(req: HttpRequest, res: HttpResponse): Promise<void> {
        try {
            await this.deleteProduct.execute(req.params?.id || "");
            res.status(200).json({ message: "Product deleted successfully" });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }
}
