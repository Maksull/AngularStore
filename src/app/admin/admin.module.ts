import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AdminGuard } from "../guards/admin.guard";
import { AdminComponent } from "./admin/admin.component";
import { CategoryEditorComponent } from "./category-editor/category-editor.component";
import { CategoryTableComponent } from "./category-table/category-table.component";
import { OrderTableComponent } from "./order-table/order-table.component";
import { ProductEditorComponent } from "./product-editor/product-editor.component";
import { ProductTableComponent } from "./product-table/product-table.component";
import { SupplierEditorComponent } from "./supplier-editor/supplier-editor.component";
import { SupplierTableComponent } from "./supplier-table/supplier-table.component";
import { MaterialModule } from "./material.module";

@NgModule({
    imports: [MaterialModule, RouterModule, FormsModule, BrowserModule, ReactiveFormsModule],
    declarations: [AdminComponent,
        ProductTableComponent, ProductEditorComponent,
        CategoryTableComponent, CategoryEditorComponent,
        SupplierTableComponent, SupplierEditorComponent,
        OrderTableComponent],
    providers: [AdminGuard]
})
export class AdminModule { }