import { StorageService } from "../Application/Servicves/storage-service";
import { MinioConfig } from "./config/minio";

export class MinioService implements StorageService {
    private readonly client = MinioConfig.getClient();
    private readonly bucketName = MinioConfig.getBucketName();

    public async uploadFile(buffer: Buffer, key: string, contentType: string): Promise<string> {
        await this.client.putObject(
            this.bucketName,
            key,
            buffer,
            buffer.length,
            { "Content-Type": contentType }
        );

        const baseUrl = MinioConfig.getBaseUrl();
        return `${baseUrl}/${this.bucketName}/${key}`;
    }

    public async deleteFile(key: string): Promise<void> {
        await this.client.removeObject(this.bucketName, key);
    }

    public async deleteAllFiles(prefix: string): Promise<void> {
        const objectsList = this.client.listObjects(this.bucketName, prefix, true);
        for await (const obj of objectsList) {
            if (obj.name) {
                await this.client.removeObject(this.bucketName, obj.name);
            }
        }
    }
}
