import { Component, IterableDiffer, IterableDiffers, ViewChild } from "@angular/core";
import { Product } from "src/app/models/product";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { ProductService } from "src/app/services/product.service";
import { CategoryService } from "src/app/services/category.service";
import { SupplierService } from "src/app/services/supplier.service";
import { MatSort } from "@angular/material/sort";


@Component({
    templateUrl: "productTable.component.html"
})
export class ProductTableComponent {
    private differ: IterableDiffer<Product>;
    public colsAndRows: string[] = ["productId", "name", "category", "supplier", "price", "buttons"];
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