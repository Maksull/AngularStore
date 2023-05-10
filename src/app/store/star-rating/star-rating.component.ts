import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-star-rating',
    templateUrl: './star-rating.component.html',
    styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements AfterViewInit {
    private ratings: any;
    private ratingActive: any;
    private ratingValue: any;

    @Input()
    averageRating!: number;
    @Input()
    isAuthenticated: boolean = false;
    @Output()
    ratingSelected: EventEmitter<number> = new EventEmitter<number>();

    ngAfterViewInit() {
        this.ratings = document.querySelectorAll('.rating');
        if (this.ratings.length > 0) {
            this.initRatings();
        }
    }

    private initRatings() {
        for (let index = 0; index < this.ratings.length; index++) {
            const rating = this.ratings[index];
            this.initRating(rating);
        }
    }

    private initRating(rating: any) {
        this.initRatingVars(rating);
        this.setRatingActiveWidth();

        if (rating.classList.contains('rating-set')) {
            this.setRating(rating);
        }
    }

    private initRatingVars(rating: any) {
        this.ratingActive = document.querySelector('.rating-active');
        this.ratingValue = document.querySelector('.rating-value');
    }
    private setRatingActiveWidth(index = this.ratingValue.innerHTML) {
        const ratingActiveWidth = index / 0.05;
        this.ratingActive.style.width = `${ratingActiveWidth}%`;
    }

    private setRating(rating: Element): void {
        const ratingItems = rating.querySelectorAll('.rating-item');

        for (let index = 0; index < ratingItems.length; index++) {
            const ratingItem = ratingItems[index] as HTMLInputElement;

            if (this.isAuthenticated) {
                ratingItem.addEventListener('mouseenter', (e: MouseEvent) => {
                    this.initRatingVars(ratingItem);
                    this.setRatingActiveWidth(ratingItem.value);
                });

                ratingItem.addEventListener('mouseleave', (e: MouseEvent) => {
                    this.setRatingActiveWidth();
                });

                ratingItem.addEventListener('click', (e: MouseEvent) => {
                    this.initRatingVars(rating);

                    //set your value
                    this.ratingValue.innerHTML = index + 1;
                    this.setRatingActiveWidth();
                    this.ratingSelected.emit(index + 1);
                });
            }
        }
    }
}
