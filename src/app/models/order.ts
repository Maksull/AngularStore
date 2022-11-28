import { Injectable } from "@angular/core";
import { Cart } from "./cart";
import { CartLine } from "./cartLine";

@Injectable()
export class Order {
    public orderId?: number;
    public name?: string;
    public email?: string;
    public address?: string;
    public city?: string;
    public country?: string;
    public zip?: string;
    public isShipped?: boolean;
    public lines?: CartLine[];

    public constructor(private cart: Cart) { }

    public clear() {
        this.orderId = undefined;
        this.name = this.email = this.address = this.city = this.country = this.zip = undefined;
        this.isShipped = false;
        this.cart.clear();
    }
}