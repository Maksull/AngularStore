import { Component } from '@angular/core';
import { Cart } from 'src/app/models/cart';

@Component({
    selector: 'cart-summary',
    templateUrl: './cart-summary.component.html',
    styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent {
    public constructor(public cart: Cart) { }
}
