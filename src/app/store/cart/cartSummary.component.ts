import { Component } from "@angular/core";
import { Cart } from "src/app/models/cart";

@Component({
    selector: "cart-summary",
    templateUrl: "cartSummary.component.html"
})
export class CartSummaryComponent {
    public constructor(public cart: Cart){}
}