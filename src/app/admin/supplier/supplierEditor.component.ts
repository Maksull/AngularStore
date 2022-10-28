import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Supplier } from "src/app/models/supplier";
import { SupplierService } from "src/app/services/supplier.service";

@Component({
    templateUrl: "supplierEditor.component.html"
})
export class SupplierEditorComponent {
    public editing: boolean = false;
    public supplier: Supplier = new Supplier();
    public isSubmitted: boolean = false;

    public constructor(private supplierService: SupplierService, private router: Router, activeRoute: ActivatedRoute) {
        this.editing = activeRoute.snapshot.params["mode"] == "edit";
        if (this.editing) {
            Object.assign(this.supplier, supplierService.getSupplier(activeRoute.snapshot.params["id"]));
        }
    }

    public save(form: NgForm) {
        this.isSubmitted = true;
        if (form.valid) {
            if (this.supplier.products == undefined) {
                this.supplier.products = [];
            }
            this.supplierService.saveSupplier(this.supplier);
            this.router.navigateByUrl("/admin/main/suppliers");
        }
    }
}