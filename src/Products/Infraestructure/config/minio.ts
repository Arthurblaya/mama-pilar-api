import { Client } from "minio";

export class MinioConfig {
    private static client: Client | null = null;

    public static initialize(): void {
        if (!this.client) {
            this.client = new Client({
                endPoint: process.env.MINIO_ENDPOINT!,
                port: parseInt(process.env.MINIO_PORT!, 10),
                useSSL: process.env.MINIO_USE_SSL === "true",
                accessKey: process.env.MINIO_ACCESS_KEY!,
                secretKey: process.env.MINIO_SECRET_KEY!,
            });
        }
    }

    public static getClient(): Client {
        if (!this.client) {
            throw new Error("MinioConfig is not initialized. Call initialize() first.");
        }
        return this.client;
    }

    public static getBucketName(): string {
        return process.env.MINIO_BUCKET_NAME!;
    }

    public static getBaseUrl(): string {
        const protocol = process.env.MINIO_USE_SSL === "true" ? "https" : "http";
        return `${protocol}://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}`;
    }
}
