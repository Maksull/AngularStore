import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Cart } from "../models/cart";
import { Product } from "../models/product";
import { ImageService } from "../services/image.service";
import { ProductService } from "../services/product.service";

@Component({
    templateUrl: "productDetails.component.html"
})
export class ProductDetailsComponent {
    public product?: Product;
    public quantity: number = 1;

    public constructor(private productService: ProductService, private imageService: ImageService, private activeRoute: ActivatedRoute,
        private cart: Cart, private router: Router) { }

    ngOnInit() {
        this.productService.getProduct(Number(this.activeRoute.snapshot.params["id"])).subscribe((result: Product) => (this.product = result));
    }

    public addProductToCart() {
        this.cart.addLine(this.product!, this.quantity);
        this.router.navigateByUrl("/cart");
    }

    public productImage(img: string | undefined) {
        return this.imageService.getImageUrl(img);
    }
}