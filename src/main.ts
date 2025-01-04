import express from "express";
import { ProductsRouter } from "./Products/Infraestructure/routers/products-router";

class Main {
    static async init() {
        console.log("Iniciant l'aplicació...");

        const app = express();
        app.use(express.json());

        try {
            console.log("Configurant rutes...");
            const productsRouter = new ProductsRouter();
            app.use("/products", productsRouter.getRouter());

            const PORT = process.env.PORT || 3000;
            app.listen(PORT, () => {
                console.log(`Servidor inicialitzat correctament al port ${PORT}`);
            });
        } catch (error) {
            console.error("Error inicialitzant l'aplicació:", error);
        }
    }
}
Main.init();
