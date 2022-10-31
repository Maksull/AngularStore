import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
    public isSubmitted: boolean = false;
    public image?: File = undefined;

    public productEditorForm: FormGroup;

    public constructor(private fb: FormBuilder, private router: Router, private activeRoute: ActivatedRoute, private http: HttpClient,
        private productService: ProductService, private categoryService: CategoryService, private supplierService: SupplierService) {

        this.editing = activeRoute.snapshot.params["mode"] == "edit";
        if (this.editing) {
            Object.assign(this.product, productService.getProduct(activeRoute.snapshot.params["id"]));
            this.lastCategoryId = this.product.categoryId ?? 0;
            this.lastSupplierId = this.product.supplierId ?? 0;
        }

        this.productEditorForm = this.generateFormGroup();

        http.get<Category[]>(`${environment.apiUrl}/${this.categoriesUrl}`).subscribe((result: Category[]) => (this.categories = result));
        http.get<Supplier[]>(`${environment.apiUrl}/${this.suppliersUrl}`).subscribe((result: Supplier[]) => (this.suppliers = result));
    }

    public save() {
        this.isSubmitted = true;
        this.product = this.productEditorForm.getRawValue();
        if (this.productEditorForm.valid) {
            this.product.category = this.categories.filter(c => c.categoryId == this.product.categoryId)[0];
            this.product.supplier = this.suppliers.filter(s => s.supplierId == this.product.supplierId)[0];
            this.productService.saveProduct(this.product);
            this.categoryService.afterCreateUpdateProduct(this.product, this.lastCategoryId);
            this.supplierService.afterCreateUpdateProduct(this.product, this.lastSupplierId);
            this.router.navigateByUrl("/admin/main/products");
        }
    }

    public inputImage(event: any) {
        this.image = event.target.files[0];
        console.log(this.image);
    }

    private generateFormGroup() {
        if (this.editing) {
            return this.fb.group({
                productId: [{ value: this.product.productId, disabled: true }],
                name: [this.product.name, Validators.required],
                categoryId: [this.product.categoryId, Validators.required],
                supplierId: [this.product.supplierId, Validators.required],
                description: [this.product.description, Validators.required],
                price: [this.product.price, [Validators.required, Validators.pattern(/^\d{1,6}(\.\d{1,2})?$/)]],
                image: ['']
            });
        } else {
            return this.fb.group({
                productId: [{ value: this.product.productId, disabled: true }],
                name: ['', Validators.required],
                categoryId: ['', Validators.required],
                supplierId: ['', Validators.required],
                description: ['', Validators.required],
                price: ['', [Validators.required, Validators.pattern(/^\d{1,6}(\.\d{1,2})?$/)]],
                image: ['']
            });
        }
    }

    //#region productEditorForm gets
    public get name() {
        return this.productEditorForm.get('name');
    }
    public get categoryId() {
        return this.productEditorForm.get('categoryId');
    }
    public get supplierId() {
        return this.productEditorForm.get('supplierId');
    }
    public get description() {
        return this.productEditorForm.get('description');
    }
    public get price() {
        return this.productEditorForm.get('price');
    }
    //#endregion
}