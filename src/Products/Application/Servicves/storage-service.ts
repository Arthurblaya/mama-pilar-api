export interface StorageService {
    uploadFile(buffer: Buffer, key: string, contentType: string): Promise<string>;
    deleteFile(key: string): Promise<void>;
    deleteAllFiles(prefix: string): Promise<void>;
}
