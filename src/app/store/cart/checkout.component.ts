import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Cart } from "src/app/models/cart";
import { Order } from "src/app/models/order";
import { OrderService } from "src/app/services/order.service";

@Component({
    templateUrl: "checkout.component.html"
})
export class CheckoutComponent {
    public isOrderSent: boolean = false;
    public isSubmitted: boolean = false;
    public checkoutForm: FormGroup;

    public constructor(private fb: FormBuilder, private cart: Cart, private orderService: OrderService, public order: Order) {
        this.checkoutForm = this.generateForm();
    }

    public submitOrder() {
        this.isSubmitted = true;
        if (this.checkoutForm.valid) {
            this.order = this.checkoutForm.value;
            this.order.lines = this.cart.lines;
            this.orderService.saveOrder(this.order);
            this.cart.clear();
            this.isOrderSent = true;
        }
    }

    private generateForm() {
        return this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
            address: ['', Validators.required],
            city: ['', Validators.required],
            country: ['', Validators.required],
            zip: ['', Validators.required]
        });
    }

    //#region checkoutForm gets
    public get name() {
        return this.checkoutForm.get('name');
    }
    public get email() {
        return this.checkoutForm.get('email');
    }
    public get address() {
        return this.checkoutForm.get('address');
    }
    public get city() {
        return this.checkoutForm.get('city');
    }
    public get country() {
        return this.checkoutForm.get('country');
    }
    public get zip() {
        return this.checkoutForm.get('zip');
    }
    //#endregion
}