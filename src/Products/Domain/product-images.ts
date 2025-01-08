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
        const urlPattern = new RegExp(
            '^(https?:\\/\\/)' +
            '((\\d{1,3}\\.){3}\\d{1,3}|' +
            '([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}))' +
            '(\\:\\d{1,5})?' +
            '(\\/.*)?$',
            'i'
        );
        return urlPattern.test(url);
    }

    public get value(): string[] {
        return this.imageUrls;
    }
}