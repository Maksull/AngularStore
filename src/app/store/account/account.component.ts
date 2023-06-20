import { Component, IterableDiffer, IterableDiffers } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { Rating } from 'src/app/models/rating';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent {
    private differ: IterableDiffer<Rating>;
    public orders: Order[] = [];
    public ratings: Rating[] = [];
    public ratingsTableDataSource = new MatTableDataSource<Rating>(this.ratings);
    public editingComment: { [ratingId: string]: boolean } = {};

    public constructor(private authService: AuthService, private orderService: OrderService, private ratingService: RatingService,
        private router: Router, private differs: IterableDiffers) {
        this.differ = differs.find(this.ratings).create();
    }

    ngOnInit() {
        this.orderService.getOrderByUser().subscribe((result: Order[]) => this.orders = result);
        this.ratingService.getRatingsByUser().subscribe((result: Rating[]) => this.ratings = result);
    }

    ngDoCheck() {
        let changes = this.differ.diff(this.ratings);
        if (changes != null) {
            this.ratingsTableDataSource.data = this.ratings;
        }
    }

    public get account() {
        return this.authService.account!;
    }

    public deleteRating(id: string) {
        this.ratingService.deleteRating(id).subscribe(r => {
            this.ratings.splice(this.ratings.findIndex(r => r.ratingId == id), 1)
        });
    }

    public isEditingComment(rating: Rating): boolean {
        return this.editingComment[rating.ratingId!] || false;
    }

    public editComment(rating: Rating): void {
        this.editingComment[rating.ratingId!] = true;
    }

    public saveComment(rating: Rating): void {
        this.editingComment[rating.ratingId!] = false;
        this.ratingService.saveRating(rating).subscribe();
    }

    public logout() {
        this.authService.logout();
        this.router.navigateByUrl("/store");
    }
}
