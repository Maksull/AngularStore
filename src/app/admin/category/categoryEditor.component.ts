import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Category } from "src/app/models/category";
import { CategoryService } from "src/app/services/category.service";

@Component({
    templateUrl: "categoryEditor.component.html"
})
export class CategoryEditorComponent {
    public editing: boolean = false;
    public category: Category = new Category();
    public isSubmitted: boolean = false;

    public constructor(private categoryService: CategoryService, private router: Router, private activeRoute: ActivatedRoute) {
        this.editing = activeRoute.snapshot.params["mode"] == "edit";
        if (this.editing) {
            Object.assign(this.category, this.categoryService.getCategory(activeRoute.snapshot.params["id"]));
        }
    }

    public save(form: NgForm) {
        this.isSubmitted = true;
        if (form.valid) {
            if (this.category.products == undefined) {
                this.category.products = [];
            }
            this.categoryService.saveCategory(this.category);
            this.router.navigateByUrl("/admin/main/categories");
        }

    }
}