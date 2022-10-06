import { Component } from "@angular/core";
import { Cart } from "src/app/models/cart";

@Component({
    templateUrl: "cartDetails.component.html"
})
export class CartDetailsComponent {
    public constructor(public cart: Cart){}
 }