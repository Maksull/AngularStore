import { Category } from "./category";
import { Supplier } from "./supplier";

export class Product{
    public productId?: number;
    public name?: string;
    public description?: string;
    public price?: number;
    public categoryId?: number;
    public category?: Category;
    public supplierId?: number;
    public supplier?: Supplier; 
}