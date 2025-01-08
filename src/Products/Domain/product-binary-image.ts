export class ProductBinaryImage {
    private readonly image: Buffer;

    private constructor(image: Buffer) {
        this.image = image;
    }

    public static create(image: Buffer): ProductBinaryImage {
        if (!Buffer.isBuffer(image)) {
            throw new Error('Invalid image format: must be a binary buffer');
        }
        if (image.length === 0) {
            throw new Error('Image cannot be empty');
        }
        return new ProductBinaryImage(image);
    }

    public get value(): Buffer {
        return this.image;
    }
}