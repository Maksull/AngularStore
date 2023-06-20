import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cart } from 'src/app/models/cart';
import { Order } from 'src/app/models/order';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { emailValidator } from 'src/app/validators/email.validator';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
    public isOrderSent: boolean = false;
    public isSubmitted: boolean = false;
    public checkoutForm: FormGroup;

    public constructor(private fb: FormBuilder, private cart: Cart, private orderService: OrderService, private authService: AuthService, public order: Order) {
        this.checkoutForm = this.generateForm();
        this.fillInFormWithData();
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
            email: ['', [Validators.required, emailValidator]],
            address: ['', Validators.required],
            city: ['', Validators.required],
            country: ['', Validators.required],
            zip: ['', Validators.required]
        });
    }
    private fillInFormWithData() {
        if (this.authService.isAuthenticated) {
            this.checkoutForm.patchValue({
                name: this.authService.account?.username,
                email: this.authService.account?.email,
            });
        }
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
