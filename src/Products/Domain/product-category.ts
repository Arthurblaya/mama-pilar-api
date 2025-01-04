export class ProductCategory {
    private readonly categories: string[];
  
    private constructor(categories: string[]) {
      this.categories = categories;
    }
  
    public static create(categories: string[]): ProductCategory {
      if (!Array.isArray(categories) || categories.length === 0) {
        throw new Error('Invalid Product Categories');
      }
      return new ProductCategory(categories);
    }
  
    public get value(): string[] {
      return this.categories;
    }
  }