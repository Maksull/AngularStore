import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { CounterDirective } from "../directives/counter.directive";
import { Cart } from "../models/cart";
import { Order } from "../models/order";
import { CartDetailsComponent } from "./cart/cartDetails.component";
import { CartSummaryComponent } from "./cart/cartSummary.component";
import { CheckoutComponent } from "./cart/checkout.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { MainComponent } from "./main.component";
import { MaterialFeatures } from "./material.module";
import { ProductDetailsComponent } from "./productDetails.component";
import { StoreComponent } from "./store.component";

@NgModule({
    declarations: [CounterDirective, MainComponent, StoreComponent, HeaderComponent, CartSummaryComponent, FooterComponent, ProductDetailsComponent, 
        CartDetailsComponent, CheckoutComponent],
    imports: [MaterialFeatures, HttpClientModule, BrowserModule, RouterModule, FormsModule, ReactiveFormsModule],
    providers: [Cart, Order]
})
export class StoreModule{}