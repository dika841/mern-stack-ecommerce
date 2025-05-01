export interface IUpdateProductData {
  name?: string;
  description?: string;
  brand?: string;
  category?: string;
  variants?: Array<{
    size: string;
    color: string;
    price: number;
    stock: number;
    sku: string;
  }>;
  images?: string[];
}
