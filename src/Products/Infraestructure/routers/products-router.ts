import express, { Router } from "express";
import { ProductsController } from "../../Application/Controllers/products-controller";
import { GetAllProducts } from "../../Application/UseCases/get-all-products";
import { GetProductById } from "../../Application/UseCases/get-product-by-id";
import { CreateProduct } from "../../Application/UseCases/create-product";
import { UpdateProduct } from "../../Application/UseCases/update-product";
import { DeleteProduct } from "../../Application/UseCases/delete-product";
import { InMemoryProductRepository } from "../in-memmory-product-repository";
import { HttpRequest } from "../../../Shared/http-request";
import { HttpResponse } from "../../../Shared/http-response";

export class ProductsRouter {
    private readonly router: Router;
    private readonly productsController: ProductsController;

    constructor() {
        const productRepository = new InMemoryProductRepository();

        this.productsController = new ProductsController(
            new GetAllProducts(productRepository),
            new GetProductById(productRepository),
            new CreateProduct(productRepository),
            new UpdateProduct(productRepository),
            new DeleteProduct(productRepository)
        );

        this.router = express.Router();
        this.setupRoutes();
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