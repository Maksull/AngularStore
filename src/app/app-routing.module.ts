import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './admin/auth.component';
import { CategoryEditorComponent } from './admin/category/categoryEditor.component';
import { CategoryTableComponent } from './admin/category/categoryTable.component';
import { OrderTableComponent } from './admin/order/orderTable.component';
import { ProductEditorComponent } from './admin/product/productEditor.component';
import { ProductTableComponent } from './admin/product/productTable.component';
import { SupplierEditorComponent } from './admin/supplier/supplierEditor.component';
import { SupplierTableComponent } from './admin/supplier/supplierTable.component';
import { AuthGuard } from './guards/authGuard.guard';
import { StoreFirstGuard } from './guards/storeFirst.guard';
import { CartDetailsComponent } from './store/cart/cartDetails.component';
import { CheckoutComponent } from './store/cart/checkout.component';
import { MainComponent } from './store/main.component';
import { ProductDetailsComponent } from './store/productDetails.component';
import { StoreComponent } from './store/store.component';

const routes: Routes = [
  { path: "main", component: MainComponent},
  { path: "store", component: StoreComponent, canActivate: [StoreFirstGuard] },
  { path: "store/:category", component: StoreComponent},
  { path: "product/:id", component: ProductDetailsComponent },
  { path: "cart", component: CartDetailsComponent, canActivate: [StoreFirstGuard] },
  { path: "checkout", component: CheckoutComponent, canActivate: [StoreFirstGuard] },
  {
    path: "admin", children: [
      { path: "auth", component: AuthComponent },
      {
        path: "main", component: AdminComponent, canActivate: [AuthGuard], children: [
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
