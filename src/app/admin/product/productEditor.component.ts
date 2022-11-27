import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Category } from "src/app/models/category";
import { Product } from "src/app/models/product";
import { Supplier } from "src/app/models/supplier";
import { CategoryService } from "src/app/services/category.service";
import { ImageService } from "src/app/services/image.service";
import { ProductService } from "src/app/services/product.service";
import { SupplierService } from "src/app/services/supplier.service";

@Component({
    templateUrl: "productEditor.component.html"
})
export class ProductEditorComponent {
    private lastCategoryId: number = 0;
    private lastSupplierId: number = 0;
    public editing: boolean = false;
    public product: Product = new Product();
    public categories: Category[] = [];
    public suppliers: Supplier[] = [];
    public isSubmitted: boolean = false;
    public image?: File = undefined;

    public productEditorForm!: FormGroup;

    public constructor(private fb: FormBuilder, private router: Router, private activeRoute: ActivatedRoute,
        private productService: ProductService, private categoryService: CategoryService, private supplierService: SupplierService, private imageService: ImageService) { }

    ngOnInit() {
        this.editing = this.activeRoute.snapshot.params["mode"] == "edit";
        if (this.editing) {
            this.productService.getProduct(this.activeRoute.snapshot.params["id"]).subscribe((result: Product) => {
                this.product = result;
                this.productEditorForm = this.generateFormGroup();
            })
            this.lastCategoryId = this.product.categoryId ?? 0;
            this.lastSupplierId = this.product.supplierId ?? 0;
        }
        this.productEditorForm = this.generateFormGroup();
        this.categories = this.categoryService.getCategories();
        this.suppliers = this.supplierService.getSuppliers();
    }

    public save() {
        this.isSubmitted = true;
        if (this.productEditorForm!.valid) {
            this.product = this.productEditorForm!.getRawValue();
            this.product.img = this.image;
            const formData = new FormData();
            if (this.product.productId != undefined) {
                formData.append('productId', this.product.productId!.toString());
            }

            formData.append('name', this.product.name!)
            formData.append('description', this.product.description!);
            formData.append('categoryId', this.product.categoryId!.toString());
            formData.append('supplierId', this.product.supplierId!.toString());
            formData.append('price', this.product.price!.toString());
            formData.append('img', this.product.img!);

            this.product.category = this.categories.filter(c => c.categoryId == this.product.categoryId)[0];
            this.product.supplier = this.suppliers.filter(s => s.supplierId == this.product.supplierId)[0];
            this.productService.saveProduct(formData);

            this.categoryService.afterCreateUpdateProduct(this.product, this.lastCategoryId);
            this.supplierService.afterCreateUpdateProduct(this.product, this.lastSupplierId);
            this.router.navigateByUrl("/admin/main/products");
        }
    }

    public inputImage(event: any) {
        this.image = event.target.files[0];
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
                img: [""]
            });
        } else {
            return this.fb.group({
                productId: [{ value: this.product.productId, disabled: true }],
                name: ['', Validators.required],
                categoryId: ['', Validators.required],
                supplierId: ['', Validators.required],
                description: ['', Validators.required],
                price: ['', [Validators.required, Validators.pattern(/^\d{1,6}(\.\d{1,2})?$/)]],
                img: [undefined, Validators.required]
            });
        }
    }


    public productImage(img: string | undefined) {
        return this.imageService.getImageUrl(img);
    }

    //#region productEditorForm gets
    public get name() {
        return this.productEditorForm!.get('name');
    }
    public get categoryId() {
        return this.productEditorForm!.get('categoryId');
    }
    public get supplierId() {
        return this.productEditorForm!.get('supplierId');
    }
    public get description() {
        return this.productEditorForm!.get('description');
    }
    public get price() {
        return this.productEditorForm!.get('price');
    }
    public get img() {
        return this.productEditorForm!.get('img');
    }
    //#endregion
}