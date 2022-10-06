import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Cart } from "../models/cart";
import { Category } from "../models/category";
import { Product } from "../models/product";
import { CategoryService } from "../services/category.service";
import { ProductService } from "../services/product.service";

@Component({
    selector: "app-root",
    templateUrl: "store.component.html"
})
export class StoreComponent {
    public title = "AngularStore";
    public selectedCategory: string | undefined;
    public productsPerPage: number = 6;
    public selectedPage: number = 1;
    private pageIndex: number = 0;

    public constructor(private productService: ProductService, private categoryService: CategoryService, private cart: Cart, private router: Router) { }

    public get products(): Product[] {
        this.pageIndex = (this.selectedPage - 1) * this.productsPerPage;
        return this.productService.getProducts().slice(this.pageIndex, Number(this.pageIndex) + Number(this.productsPerPage));
    }

    public get categories(): Category[] {
        return this.categoryService.getCategories();
    }

    public get pageCount(): Number {
        return Math.ceil(this.productService.getProducts().length / this.productsPerPage)
    }

    public changeCategory(newCategory?: string) {
        this.selectedCategory = newCategory;
    }

    public changePage(newPage: number) {
        this.selectedPage = newPage;
    }

    public changePageSize(newPageSize: number) {
        this.productsPerPage = newPageSize;
        this.selectedPage = 1;
    }

    public addProductToCart(product: Product) {
        this.cart.addLine(product);
        this.router.navigateByUrl("cart");
    }
}