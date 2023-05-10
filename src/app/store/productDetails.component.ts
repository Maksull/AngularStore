import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Cart } from "../models/cart";
import { Product } from "../models/product";
import { ImageService } from "../services/image.service";
import { ProductService } from "../services/product.service";
import { Rating } from "../models/rating";
import { AuthService } from "../services/auth.service";
import { RatingService } from "../services/rating.service";

@Component({
    templateUrl: "productDetails.component.html"
})
export class ProductDetailsComponent {
    public product?: Product;
    public quantity: number = 1;
    public ratings: Rating[] = [];
    public averageRating: number = 0;
    public selectedRating?: number;
    public comment: string = '';

    public constructor(private productService: ProductService, private imageService: ImageService, private activeRoute: ActivatedRoute,
        private cart: Cart, private authService: AuthService, private ratingService: RatingService, private router: Router) { }

    ngOnInit() {
        let productId = Number(this.activeRoute.snapshot.params["id"]);
        this.productService.getProduct(productId).subscribe((result: Product) => this.product = result);
        this.productService.getProductRatings(productId).subscribe((ratings: Rating[]) => { this.ratings = ratings; this.calculateAverageRating(); });
    }

    public addProductToCart() {
        this.cart.addLine(this.product!, this.quantity);
        this.router.navigateByUrl("/cart");
    }

    public productImage(img: string | undefined) {
        return this.imageService.getImageUrl(img);
    }

    public calculateAverageRating(): void {
        let totalRating = 0;
        for (let rating of this.ratings) {
            totalRating += rating.value!;
        }
        this.averageRating = totalRating / this.ratings.length;
    }

    public isLoggedIn(): boolean {
        return this.authService.isAuthenticated;
    }
    public onRatingSelected(rating: number) {
        this.selectedRating = rating;
    }
    public leaveComment() {
        console.log(this.comment)
        let rating: Rating = new Rating;
        rating.productId = this.product?.productId;
        rating.value = this.selectedRating;
        rating.comment = this.comment;
        this.ratingService.saveRating(rating);
        this.comment = '';
    }
}