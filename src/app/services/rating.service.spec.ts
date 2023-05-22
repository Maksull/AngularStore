import { TestBed } from '@angular/core/testing';

import { RatingService } from './rating.service';
import { environment } from 'src/environments/environment';
import { Rating } from '../models/rating';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('RatingService', () => {
    let service: RatingService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RatingService]
        });
        service = TestBed.inject(RatingService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get ratings by user', () => {
        const dummyRatings: Rating[] = [{
            ratingId: '1',
            productId: 123,
            userId: 'user123',
            value: 4,
            comment: 'Great product!'
        },
        {
            ratingId: '2',
            productId: 456,
            userId: 'user456',
            value: 3,
            comment: 'Average product'
        },];

        service.getRatingsByUser().subscribe((ratings: Rating[]) => {
            expect(ratings).toEqual(dummyRatings);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/ratings/userId`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyRatings);
    });

    it('should save a new rating', () => {
        const newRating: Rating = {
            ratingId: '',
            productId: 123,
            userId: 'user123',
            value: 4,
            comment: 'Great product!'
        };

        service.saveRating(newRating).subscribe((rating: Rating) => {
            expect(rating).toEqual(newRating);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/ratings`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newRating);
        req.flush(newRating);
    });

    it('should update an existing rating', () => {
        const existingRating: Rating = {
            ratingId: '1',
            productId: 123,
            userId: 'user123',
            value: 4,
            comment: 'Great product!'
        };

        service.saveRating(existingRating).subscribe((rating: Rating) => {
            expect(rating).toEqual(existingRating);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/ratings`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(existingRating);
        req.flush(existingRating);
    });

    it('should delete a rating', () => {
        const ratingId = '123';

        service.deleteRating(ratingId).subscribe((rating: Rating) => {
            expect(rating).toBeTruthy();
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/ratings/${ratingId}`);
        expect(req.request.method).toBe('DELETE');
        req.flush({});
    });
});
