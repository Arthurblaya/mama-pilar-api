import express, { Router } from "express";
import { ProductsController } from "../../Application/Controllers/products-controller";
import { GetAllProducts } from "../../Application/UseCases/get-all-products";
import { GetProductById } from "../../Application/UseCases/get-product-by-id";
import { CreateProduct } from "../../Application/UseCases/create-product";
import { UpdateProduct } from "../../Application/UseCases/update-product";
import { DeleteProduct } from "../../Application/UseCases/delete-product";
import { MongoProductRepository } from "../mongo-product-repository";
import { MongoConfig } from "../config/mongo";
import { HttpRequest } from "../../../Shared/http-request";
import { HttpResponse } from "../../../Shared/http-response";
import { MinioService } from "../minio-storage-service";
import { MinioConfig } from "../config/minio";

export class ProductsRouter {
    private readonly router: Router;
    private readonly productsController: ProductsController;

    private constructor(productRepository: MongoProductRepository, storageService: MinioService) {
        this.productsController = new ProductsController(
            new GetAllProducts(productRepository),
            new GetProductById(productRepository),
            new CreateProduct(productRepository, storageService),
            new UpdateProduct(productRepository, storageService),
            new DeleteProduct(productRepository, storageService)
        );

        this.router = express.Router();
        this.setupRoutes();
    }

    public static async create(): Promise<ProductsRouter> {
        const db = await MongoConfig.connect();
        const productRepository = new MongoProductRepository(db);
        MinioConfig.initialize();
        const storageService = new MinioService();
        return new ProductsRouter(productRepository, storageService);
    }

    private setupRoutes(): void {
        this.router.get("/", (req, res) => this.handle(req, res, "getAll"));
        this.router.get("/:id", (req, res) => this.handle(req, res, "getById"));
        this.router.post("/", (req, res) => this.handle(req, res, "create"));
        this.router.put("/:id", (req, res) => this.handle(req, res, "update"));
        this.router.delete("/:id", (req, res) => this.handle(req, res, "delete"));
    }

    public getRouter(): Router {
        return this.router;
    }

    private async handle(req: any, res: any, method: keyof ProductsController): Promise<void> {
        const httpRequest: HttpRequest = {
            params: req.params,
            body: req.body,
            query: req.query,
        };

        const httpResponse: HttpResponse = {
            status: (code: number) => {
                res.status(code);
                return httpResponse;
            },
            json: (data: any) => res.json(data),
        };

        try {
            await this.productsController[method](httpRequest, httpResponse);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}
