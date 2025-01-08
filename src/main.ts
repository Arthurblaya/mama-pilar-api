import express from "express";
import { ProductsRouter } from "./Products/Infraestructure/routers/products-router";

class Main {
    static async init() {
        const app = express();        
        app.use(express.json({ limit: "10mb" }));
        app.use(express.urlencoded({ limit: "10mb", extended: true }));

        try {
            const productsRouter = await ProductsRouter.create();
            app.use("/products", productsRouter.getRouter());

            const PORT = process.env.PORT || 3000;
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        } catch (error) {
            console.error("Error initializing application:", error);
        }
    }
}

Main.init();