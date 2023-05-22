import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, IterableDiffer, IterableDiffers, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-category-table',
    templateUrl: './category-table.component.html',
    styleUrls: ['./category-table.component.css', '../admin/admin.component.css']
})
export class CategoryTableComponent {
    private differ: IterableDiffer<Category>;
    public colsAndRows: string[] = ["categoryId", "name", "products.length", "buttons"];
    public tableDataSource = new MatTableDataSource<Category>(this.categoryService.getCategories());

    @ViewChild(MatPaginator)
    public paginator?: MatPaginator;
    @ViewChild(MatSort)
    public sort?: MatSort;

    public constructor(private categoryService: CategoryService, differs: IterableDiffers, private productService: ProductService) {
        this.differ = differs.find(categoryService.getCategories()).create();
    }

    public ngDoCheck() {
        let changes = this.differ.diff(this.categoryService.getCategories());
        if (changes != null) {
            this.tableDataSource.data = this.categoryService.getCategories();
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

    public deleteCategory(id: number) {
        this.categoryService.deleteCategory(id);
        this.productService.afterDeleteCategory(id);
    }

    public changeSearch(selectedSearch: string) {
        this.tableDataSource.data = this.categoryService.getCategories().filter(c => c.name?.includes(selectedSearch))
    }
}
