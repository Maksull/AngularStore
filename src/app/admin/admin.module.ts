import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AdminGuard } from "../guards/adminGuard.guard";
import { AdminComponent } from "./admin.component";
import { CategoryEditorComponent } from "./category/categoryEditor.component";
import { CategoryTableComponent } from "./category/categoryTable.component";
import { MaterialFeatures } from "./material.module";
import { OrderTableComponent } from "./order/orderTable.component";
import { ProductEditorComponent } from "./product/productEditor.component";
import { ProductTableComponent } from "./product/productTable.component";
import { SupplierEditorComponent } from "./supplier/supplierEditor.component";
import { SupplierTableComponent } from "./supplier/supplierTable.component";

@NgModule({
    imports: [MaterialFeatures, RouterModule, FormsModule, BrowserModule, ReactiveFormsModule],
    declarations: [AdminComponent,
        ProductTableComponent, ProductEditorComponent,
        CategoryTableComponent, CategoryEditorComponent,
        SupplierTableComponent, SupplierEditorComponent,
        OrderTableComponent],
    providers: [AdminGuard, CookieService]
})
export class AdminModule { }