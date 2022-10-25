import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
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
    public selectedSearch: string = "";
    public selectedSort?: string = undefined;
    public productsPerPage: number = 6;
    public selectedPage: number = 1;
    public isFromLower?: boolean = undefined;
    private pageIndex: number = 0;

    public constructor(private productService: ProductService, private categoryService: CategoryService, private cart: Cart, private router: Router) { }

    public get products(): Product[] {
        this.pageIndex = (this.selectedPage - 1) * this.productsPerPage;

        if (this.selectedSort != undefined && this.selectedSearch != "") {
            const selectedSortProperty = this.selectedSort as keyof Product;
            const isFromLower: boolean = this.isFromLower ?? false;

            return this.productService.getProducts(this.selectedCategory).filter(p => p.name?.includes(this.selectedSearch)).sort(function (x, y) {
                if (isFromLower) {
                    if (x[selectedSortProperty]! > y[selectedSortProperty]!) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
                else {
                    if (x[selectedSortProperty]! < y[selectedSortProperty]!) {
                        return 1;
                    } else {
                        return -1;
                    }
                }

            }).slice(this.pageIndex, Number(this.pageIndex) + Number(this.productsPerPage));
        }
        else if (this.selectedSort != undefined) {
            const selectedSortProperty = this.selectedSort as keyof Product;
            const isFromLower: boolean = this.isFromLower ?? false;

            return this.productService.getProducts(this.selectedCategory).sort(function (x, y) {
                if (isFromLower) {
                    if (x[selectedSortProperty]! > y[selectedSortProperty]!) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
                else {
                    if (x[selectedSortProperty]! < y[selectedSortProperty]!) {
                        return 1;
                    } else {
                        return -1;
                    }
                }

            }).slice(this.pageIndex, Number(this.pageIndex) + Number(this.productsPerPage));
        }
        else if (this.selectedSearch != "") {
            return this.productService.getProducts(this.selectedCategory).filter(p => p.name?.includes(this.selectedSearch)).slice(this.pageIndex, Number(this.pageIndex) + Number(this.productsPerPage));
        }
        else {
            return this.productService.getProducts(this.selectedCategory).slice(this.pageIndex, Number(this.pageIndex) + Number(this.productsPerPage));
        }
    }

    public get categories(): Category[] {
        return this.categoryService.getCategories();
    }

    public get pageCount(): number {
        if (this.selectedSearch != "") {
            return Math.ceil(this.productService.getProducts(this.selectedCategory).filter(p => p.name?.includes(this.selectedSearch)).length / this.productsPerPage)
        }
        return Math.ceil(this.productService.getProducts(this.selectedCategory).length / this.productsPerPage)
    }

    public changeCategory(newCategory?: string) {
        this.selectedPage = 1;
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

    public changeSearch(selectedSearch: string) {
        this.selectedSearch = selectedSearch;
    }

    public changeSort(selectedSort: string) {
        this.selectedSort = selectedSort;
    }

    public changeDirection(selectedDirection: string) {
        if (selectedDirection == 'true') {
            this.isFromLower = true;
        }
        else {
            this.isFromLower = false;
        }
    }

    public reset(){
        this.selectedSort = undefined;
        this.selectedSearch = '';
        this.isFromLower = undefined;
    }
}