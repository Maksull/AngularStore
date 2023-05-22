import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, IterableDiffer, IterableDiffers, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
    selector: 'app-product-table',
    templateUrl: './product-table.component.html',
    styleUrls: ['./product-table.component.css', '../admin/admin.component.css']
})
export class ProductTableComponent {
    private differ: IterableDiffer<Product>;
    public colsAndRows: string[] = ["productId", "name", "category.name", "supplier.name", "price", "buttons"];
    public tableDataSource = new MatTableDataSource<Product>(this.productService.getProducts());

    @ViewChild(MatPaginator)
    public paginator?: MatPaginator;

    @ViewChild(MatSort)
    public sort?: MatSort;

    public constructor(private productService: ProductService, differs: IterableDiffers, private categoryService: CategoryService, private supplierService: SupplierService) {
        this.differ = differs.find(productService.getProducts()).create();
    }

    public ngDoCheck() {
        let changes = this.differ.diff(this.productService.getProducts());
        if (changes != null) {
            this.tableDataSource.data = this.productService.getProducts();
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

    public deleteProduct(id: number) {
        this.productService.deleteProduct(id);
        this.categoryService.afterDeleteProduct(this.tableDataSource.data.find(d => d.productId == id));
        this.supplierService.afterDeleteProduct(this.tableDataSource.data.find(d => d.productId == id));
    }

    public changeSearch(selectedSearch: string) {
        this.tableDataSource.data = this.productService.getProducts().filter(p => p.name?.includes(selectedSearch))
    }
}
