import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Cart } from "../models/cart";
import { Category } from "../models/category";
import { Product } from "../models/product";
import { CategoryService } from "../services/category.service";
import { ImageService } from "../services/image.service";
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

    public constructor(private productService: ProductService, private categoryService: CategoryService, private imageService: ImageService, private cart: Cart,
        private router: Router, private activeRoute: ActivatedRoute, private http: HttpClient) {
        this.selectedCategory = activeRoute.snapshot.params["category"];
    }

    public get products(): Product[] {
        this.pageIndex = (this.selectedPage - 1) * this.productsPerPage;
        if (this.selectedSearch != "" && this.selectedSort != undefined) {
            return this.productService.getProducts(this.selectedCategory).filter(p => p.name?.includes(this.selectedSearch)).sort((x, y) => this.sort(x, y))
                .slice(this.pageIndex, Number(this.pageIndex) + Number(this.productsPerPage));
        }
        else if (this.selectedSearch != "") {
            return this.productService.getProducts(this.selectedCategory).filter(p => p.name?.includes(this.selectedSearch))
                .slice(this.pageIndex, Number(this.pageIndex) + Number(this.productsPerPage));
        }
        else if (this.selectedSort != undefined) {
            return this.productService.getProducts(this.selectedCategory).sort((x, y) => this.sort(x, y))
                .slice(this.pageIndex, Number(this.pageIndex) + Number(this.productsPerPage));
        }
        else {
            return this.productService.getProducts(this.selectedCategory).slice(this.pageIndex, Number(this.pageIndex) + Number(this.productsPerPage));
        }
    }

    // public productImage(img: File | undefined) {
    //     return `data:image/jpg;base64,${img}`;
    // }
    public productImage(img: string | undefined) {
        return this.imageService.getImageUrl(img);
    }

    public get categories(): Category[] {
        return this.categoryService.getCategories().filter(c => c.products!.length > 0);
    }

    public get pageCount(): number {
        if (this.selectedSearch != "") {
            return Math.ceil(this.productService.getProducts(this.selectedCategory).filter(p => p.name?.includes(this.selectedSearch)).length / this.productsPerPage)
        }
        return Math.ceil(this.productService.getProducts(this.selectedCategory).length / this.productsPerPage)
    }

    public changeCategory(newCategory?: string) {
        if (newCategory == 'undefined') {
            newCategory = undefined
        }
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

    public reset() {
        this.selectedSort = undefined;
        this.selectedSearch = '';
        this.isFromLower = undefined;
    }

    private sort(x: Product, y: Product) {
        if (this.selectedSort?.includes(".")) {
            switch (this.selectedSort) {
                case "category.name": {
                    if (this.isFromLower) {
                        if (x.category?.name! < y.category?.name!) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                    else {
                        if (x.category?.name! > y.category?.name!) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                }
                case "supplier.name": {
                    if (this.isFromLower) {
                        if (x.supplier?.name! < y.supplier?.name!) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                    else {
                        if (x.supplier?.name! > y.supplier?.name!) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                }
            }
        }
        const selectedSortProperty = this.selectedSort as keyof Product;

        if (this.isFromLower) {
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
    }
}