import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AccountGuard } from 'src/app/guards/account.guard';
import { LoginGuard } from 'src/app/guards/login.guard';
import { Cart } from 'src/app/models/cart';
import { Order } from 'src/app/models/order';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { StoreComponent } from './store/store.component';
import { AccountComponent } from './account/account.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MaterialModule } from './material.module';
import { CounterDirective } from 'src/app/directives/counter.directive';


@NgModule({
  declarations: [CounterDirective, MainComponent, StoreComponent, HeaderComponent, CartSummaryComponent, FooterComponent, ProductDetailsComponent,
    AccountComponent, LoginComponent, CartDetailsComponent, CheckoutComponent, StarRatingComponent],
  imports: [MaterialModule, HttpClientModule, BrowserModule, RouterModule, FormsModule, ReactiveFormsModule],
  providers: [Cart, Order, AccountGuard, LoginGuard]
})
export class StoreModule { }
