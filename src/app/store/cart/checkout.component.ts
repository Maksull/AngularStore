import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Cart } from "src/app/models/cart";
import { Order } from "src/app/models/order";
import { OrderService } from "src/app/services/order.service";

@Component({
    templateUrl: "checkout.component.html"
})
export class CheckoutComponent {
    public isOrderSent: boolean = false;
    public isSubmitted: boolean = false;

    public constructor(private cart: Cart, private orderService: OrderService, public order: Order) { }

    public submitOrder(form: NgForm){
        this.isSubmitted = true;
        if(form.valid){
            this.order.lines = this.cart.lines;
            this.orderService.saveOrder(this.order);
            this.order.clear();
            this.isOrderSent = true;
        }
    }
}