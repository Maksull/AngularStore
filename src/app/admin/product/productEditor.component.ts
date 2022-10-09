import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Category } from "src/app/models/category";
import { Product } from "src/app/models/product";
import { Supplier } from "src/app/models/supplier";
import { CategoryService } from "src/app/services/category.service";
import { ProductService } from "src/app/services/product.service";
import { SupplierService } from "src/app/services/supplier.service";
import { environment } from "src/environments/environment";

@Component({
    templateUrl: "productEditor.component.html"
})
export class ProductEditorComponent {
    private categoriesUrl: string = "categories";
    private suppliersUrl: string = "suppliers";
    private lastCategoryId: number = 0;
    private lastSupplierId: number = 0;
    public editing: boolean = false;
    public product: Product = new Product();
    public categories: Category[] = [];
    public suppliers: Supplier[] = [];

    public constructor(private router: Router, private activeRoute: ActivatedRoute, private http: HttpClient,
        private productService: ProductService, private categoryService: CategoryService, private supplierService: SupplierService) {
        this.editing = activeRoute.snapshot.params["mode"] == "edit";
        if (this.editing) {
            Object.assign(this.product, productService.getProduct(activeRoute.snapshot.params["id"]));
            this.lastCategoryId = this.product.categoryId ?? 0;
            this.lastSupplierId = this.product.supplierId ?? 0;
        }
        http.get<Category[]>(`${environment.apiUrl}/${this.categoriesUrl}`).subscribe((result: Category[]) => (this.categories = result));
        http.get<Supplier[]>(`${environment.apiUrl}/${this.suppliersUrl}`).subscribe((result: Supplier[]) => (this.suppliers = result));
    }

    public save() {
        this.product.categoryId = this.product.category?.categoryId;
        this.product.supplierId = this.product.supplier?.supplierId;
        this.productService.saveProduct(this.product);
        this.categoryService.afterCreateUpdateProduct(this.product, this.lastCategoryId);
        this.supplierService.afterCreateUpdateProduct(this.product, this.lastSupplierId);
        this.router.navigateByUrl("/admin/main/products");
    }
}