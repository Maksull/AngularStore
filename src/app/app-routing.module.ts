import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountGuard } from './guards/account.guard';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';
import { StoreFirstGuard } from './guards/store-first.guard';
import { AccountComponent } from './store/account/account.component';
import { CartDetailsComponent } from './store/cart-details/cart-details.component';
import { CheckoutComponent } from './store/checkout/checkout.component';
import { LoginComponent } from './store/login/login.component';
import { MainComponent } from './store/main/main.component';
import { ProductDetailsComponent } from './store/product-details/product-details.component';
import { StoreComponent } from './store/store/store.component';
import { AdminComponent } from './admin/admin/admin.component';
import { CategoryEditorComponent } from './admin/category-editor/category-editor.component';
import { CategoryTableComponent } from './admin/category-table/category-table.component';
import { OrderTableComponent } from './admin/order-table/order-table.component';
import { ProductEditorComponent } from './admin/product-editor/product-editor.component';
import { ProductTableComponent } from './admin/product-table/product-table.component';
import { SupplierEditorComponent } from './admin/supplier-editor/supplier-editor.component';
import { SupplierTableComponent } from './admin/supplier-table/supplier-table.component';

const routes: Routes = [
    { path: "main", component: MainComponent },
    { path: "store", component: StoreComponent, canActivate: [StoreFirstGuard] },
    { path: "store/:category", component: StoreComponent },
    { path: "product/:id", component: ProductDetailsComponent },
    { path: "cart", component: CartDetailsComponent, canActivate: [StoreFirstGuard] },
    { path: "checkout", component: CheckoutComponent, canActivate: [StoreFirstGuard] },
    { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
    { path: "account", component: AccountComponent, canActivate: [AccountGuard] },
    {
        path: "admin", children: [
            {
                path: "main", component: AdminComponent, canActivate: [AdminGuard], children: [
                    { path: "orders", component: OrderTableComponent },
                    { path: "suppliers/:mode/:id", component: SupplierEditorComponent },
                    { path: "suppliers/:mode", component: SupplierEditorComponent },
                    { path: "suppliers", component: SupplierTableComponent },
                    { path: "categories/:mode/:id", component: CategoryEditorComponent },
                    { path: "categories/:mode", component: CategoryEditorComponent },
                    { path: "categories", component: CategoryTableComponent },
                    { path: "products/:mode/:id", component: ProductEditorComponent },
                    { path: "products/:mode", component: ProductEditorComponent },
                    { path: "products", component: ProductTableComponent },
                    { path: "**", redirectTo: "products" }
                ]
            },
            { path: "**", redirectTo: "main" }
        ]
    },
    { path: "**", redirectTo: "/store" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }

