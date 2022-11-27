import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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

    public categoryEditorForm: FormGroup;

    public constructor(private fb: FormBuilder, private categoryService: CategoryService, private router: Router, private activeRoute: ActivatedRoute) {
        this.editing = activeRoute.snapshot.params["mode"] == "edit";
        if (this.editing) {
            Object.assign(this.category, this.categoryService.getCategory(activeRoute.snapshot.params["id"]));
        }
        this.categoryEditorForm = this.generateFormgroup();
    }

    public save() {
        this.isSubmitted = true;
        if (this.categoryEditorForm.valid) {
            this.category = this.categoryEditorForm.getRawValue();
            if (this.category.products == undefined) {
                this.category.products = [];
            }
            this.categoryService.saveCategory(this.category);
            this.router.navigateByUrl("/admin/main/categories");
        }
    }

    private generateFormgroup() {
        if (this.editing) {
            return this.fb.group({
                categoryId: [{ value: this.category.categoryId, disabled: true }],
                name: [this.category.name, Validators.required]
            });
        } else {
            return this.fb.group({
                categoryId: [{ value: this.category.categoryId, disabled: true }],
                name: ['', Validators.required]
            });
        }
    }


    //#region categoryEditorForm gets
    public get name() {
        return this.categoryEditorForm.get('name');
    }
    //#endregion
}