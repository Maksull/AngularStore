import { Product } from "./product";

export class CartLine{
    constructor(public product: Product, public productId: number, public quantity: number){}

    get lineCost(){
        return this.quantity * (this.product.price ?? 0);
    }
}