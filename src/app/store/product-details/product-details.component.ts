import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { Rating } from 'src/app/models/rating';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
    public product?: Product;
    public quantity: number = 1;
    public ratings: Rating[] = [];
    public averageRating: number = 0;
    public isAverageRatingCalculated: boolean = false;
    public selectedRating?: number;
    public comment: string = '';

    public constructor(private productService: ProductService, private imageService: ImageService, private activeRoute: ActivatedRoute,
        private cart: Cart, private authService: AuthService, private ratingService: RatingService, private router: Router) { }

    ngOnInit() {
        let productId = Number(this.activeRoute.snapshot.params["id"]);
        this.productService.getProduct(productId).subscribe((result: Product) => this.product = result);
        this.productService.getProductRatings(productId).subscribe({
            next: (ratings: Rating[]) => {
                this.ratings = ratings;
                this.calculateAverageRating();
                this.isAverageRatingCalculated = true;
            },
            error: (err: HttpErrorResponse) => {
                this.isAverageRatingCalculated = true;
            }
        });
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
        this.ratingService.saveRating(rating).subscribe();
        this.comment = '';
        this.selectedRating = undefined;
    }
}