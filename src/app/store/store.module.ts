import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { CounterDirective } from "../directives/counter.directive";
import { Cart } from "../models/cart";
import { Order } from "../models/order";
import { CartDetailsComponent } from "./cart/cartDetails.component";
import { CartSummaryComponent } from "./cart/cartSummary.component";
import { CheckoutComponent } from "./cart/checkout.component";
import { MaterialFeatures } from "./material.module";
import { StoreComponent } from "./store.component";

@NgModule({
    declarations: [CounterDirective, StoreComponent, CartSummaryComponent, CartDetailsComponent, CheckoutComponent],
    imports: [MaterialFeatures, HttpClientModule, BrowserModule, RouterModule, FormsModule],
    providers: [Cart, Order]
})
export class StoreModule{}