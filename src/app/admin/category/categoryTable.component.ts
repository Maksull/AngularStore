import { Component, IterableDiffer, IterableDiffers, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Category } from "src/app/models/category";
import { CategoryService } from "src/app/services/category.service";

@Component({
    templateUrl: "categoryTable.component.html"
})
export class CategoryTableComponent {
    private differ: IterableDiffer<Category>;
    public colsAndRows: string[] = ["categoryId", "name", "quantity", "buttons"];
    public tableDataSource = new MatTableDataSource<Category>(this.categoryService.getCategories());

    @ViewChild(MatPaginator)
    public paginator?: MatPaginator;

    public constructor(private categoryService: CategoryService, differs: IterableDiffers) {
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
    }

    public deleteCategory(id: number) {
        this.categoryService.deleteCategory(id);
    }
}