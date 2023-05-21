import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CategoryEditorComponent } from './admin/category/categoryEditor.component';
import { CategoryTableComponent } from './admin/category/categoryTable.component';
import { OrderTableComponent } from './admin/order/orderTable.component';
import { ProductEditorComponent } from './admin/product/productEditor.component';
import { ProductTableComponent } from './admin/product/productTable.component';
import { SupplierEditorComponent } from './admin/supplier/supplierEditor.component';
import { SupplierTableComponent } from './admin/supplier/supplierTable.component';
import { StoreFirstGuard } from './guards/storeFirst.guard';
import { CartDetailsComponent } from './store/cart/cartDetails.component';
import { CheckoutComponent } from './store/cart/checkout.component';
import { MainComponent } from './store/main.component';
import { ProductDetailsComponent } from './store/productDetails.component';
import { StoreComponent } from './store/store.component';
import { LoginComponent } from './store/login.component';
import { AccountComponent } from './store/account.component';
import { AccountGuard } from './guards/accountGuard.guard';
import { AdminGuard } from './guards/adminGuard.guard';
import { LoginGuard } from './guards/login.guard';

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
