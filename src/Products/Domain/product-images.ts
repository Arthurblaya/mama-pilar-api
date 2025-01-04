export class ProductImages {
    private readonly imageUrls: string[];

    private constructor(imageUrls: string[]) {
        this.imageUrls = imageUrls;
    }

    public static create(imageUrls: string[]): ProductImages {
        if (!Array.isArray(imageUrls) || !imageUrls.every(url => ProductImages.isValidUrl(url))) {
            throw new Error('Invalid Product Image URLs');
        }
        return new ProductImages(imageUrls);
    }

    private static isValidUrl(url: string): boolean {
        const urlPattern = new RegExp('^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$');
        return urlPattern.test(url);
    }

    public get value(): string[] {
        return this.imageUrls;
    }
}