import { Component, IterableDiffer, IterableDiffers, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Supplier } from "src/app/models/supplier";
import { ProductService } from "src/app/services/product.service";
import { SupplierService } from "src/app/services/supplier.service";

@Component({
    templateUrl: "supplierTable.component.html"
})
export class SupplierTableComponent {
    private differ: IterableDiffer<Supplier>;
    public colsAndRows: string[] = ["supplierId", "name", "city", "quantity", "buttons"];
    public tableDataSource = new MatTableDataSource<Supplier>(this.supplierService.getSuppliers());

    public constructor(private supplierService: SupplierService, private differs: IterableDiffers, private productService: ProductService) {
        this.differ = differs.find(supplierService.getSuppliers()).create();
    }

    @ViewChild(MatPaginator)
    public paginator?: MatPaginator;

    public ngDoCheck() {
        let changes = this.differ.diff(this.supplierService.getSuppliers());
        if (changes != null) {
            this.tableDataSource.data = this.supplierService.getSuppliers();
        }
    }

    public ngAfterViewInit() {
        if (this.paginator) {
            this.tableDataSource.paginator = this.paginator;
        }
    }

    public deleteSupplier(id: number) {
        this.supplierService.deleteSupplier(id);
        this.productService.afterDeleteSupplier(id);
    }
}