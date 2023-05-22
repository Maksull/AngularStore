import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Supplier } from 'src/app/models/supplier';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
    selector: 'app-supplier-editor',
    templateUrl: './supplier-editor.component.html',
    styleUrls: ['./supplier-editor.component.css', '../admin/admin.component.css']
})
export class SupplierEditorComponent {
    public editing: boolean = false;
    public supplier: Supplier = new Supplier();
    public isSubmitted: boolean = false;

    public supplierEditorForm: FormGroup;

    public constructor(private fb: FormBuilder, private supplierService: SupplierService, private router: Router, activeRoute: ActivatedRoute) {
        this.editing = activeRoute.snapshot.params["mode"] == "edit";
        if (this.editing) {
            Object.assign(this.supplier, supplierService.getSupplier(activeRoute.snapshot.params["id"]));
        }

        this.supplierEditorForm = this.generateFormgroup();
    }

    public save() {
        this.isSubmitted = true;
        if (this.supplierEditorForm.valid) {
            this.supplier = this.supplierEditorForm.getRawValue();
            if (this.supplier.products == undefined) {
                this.supplier.products = [];
            }
            this.supplierService.saveSupplier(this.supplier);
            this.router.navigateByUrl("/admin/main/suppliers");
        }
    }

    private generateFormgroup() {
        if (this.editing) {
            return this.fb.group({
                supplierId: [{ value: this.supplier.supplierId, disabled: true }],
                name: [this.supplier.name, Validators.required],
                city: [this.supplier.city, Validators.required]
            });
        } else {
            return this.fb.group({
                supplierId: [{ value: this.supplier.supplierId, disabled: true }],
                name: ['', Validators.required],
                city: ['', Validators.required]
            });
        }
    }

    //#region supplierEditorForm gets
    public get name() {
        return this.supplierEditorForm.get('name');
    }
    public get city() {
        return this.supplierEditorForm.get('city');
    }
    //#endregion
}
