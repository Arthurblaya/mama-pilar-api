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
            const { name, category, price, images, description } = req.body || {};

            if (!images || !Array.isArray(images)) {
                throw new Error("Images are required and must be provided as base64 strings.");
            }

            const binaryImages = images.map((imageBase64: string) => Buffer.from(imageBase64, "base64"));
            const mimeTypes = images.map(() => "image/jpeg");

            const productId = await this.createProduct.execute(
                name,
                category,
                price,
                binaryImages,
                mimeTypes,
                description
            );

            res.status(201).json({ message: "Product created successfully", productId });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    public async update(req: HttpRequest, res: HttpResponse): Promise<void> {
        try {
            const { id } = req.params as any;
            const updates = req.body;

            if (!id) {
                res.status(400).json({ error: "Product ID is required" });
                return;
            }

            if (!updates || Object.keys(updates).length === 0) {
                res.status(400).json({ error: "No updates provided" });
                return;
            }

            await this.updateProduct.execute(id, updates);
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
