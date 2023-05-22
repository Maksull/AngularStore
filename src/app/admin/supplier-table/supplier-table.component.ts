import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, IterableDiffer, IterableDiffers, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Supplier } from 'src/app/models/supplier';
import { ProductService } from 'src/app/services/product.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
    selector: 'app-supplier-table',
    templateUrl: './supplier-table.component.html',
    styleUrls: ['./supplier-table.component.css', '../admin/admin.component.css']
})
export class SupplierTableComponent {
    private differ: IterableDiffer<Supplier>;
    public colsAndRows: string[] = ["supplierId", "name", "city", "products.length", "buttons"];
    public tableDataSource = new MatTableDataSource<Supplier>(this.supplierService.getSuppliers());

    public constructor(private supplierService: SupplierService, private differs: IterableDiffers, private productService: ProductService) {
        this.differ = differs.find(supplierService.getSuppliers()).create();
    }

    @ViewChild(MatPaginator)
    public paginator?: MatPaginator;
    @ViewChild(MatSort)
    public sort?: MatSort;

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
        if (this.sort) {
            this.tableDataSource.sortingDataAccessor =
                (data: any, sortHeaderId: string): string | number => {
                    let value: any = null;
                    if (sortHeaderId.includes('.')) {
                        const ids = sortHeaderId.split('.');
                        value = data;
                        ids.forEach(function (x) {
                            value = value ? value[x] : null;
                        });
                    } else {
                        value = data[sortHeaderId];
                    }
                    return _isNumberValue(value) ? Number(value) : value;
                };
            this.tableDataSource.sort = this.sort;
        }
    }

    public deleteSupplier(id: number) {
        this.supplierService.deleteSupplier(id);
        this.productService.afterDeleteSupplier(id);
    }

    public changeSearch(selectedSearch: string) {
        this.tableDataSource.data = this.supplierService.getSuppliers().filter(s => s.name?.includes(selectedSearch))
    }
}
