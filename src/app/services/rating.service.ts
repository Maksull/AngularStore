import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rating } from '../models/rating';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RatingService {
    private url: string = "ratings";

    constructor(private http: HttpClient) { }

	public getRatingsByUser(){
		return this.http.get<Rating[]>(`${environment.apiUrl}/${this.url}/userId`, this.getOptions());
	}

	public saveRating(rating: Rating){
		if (rating.ratingId == null || rating.ratingId == '') {
            return this.http.post<Rating>(`${environment.apiUrl}/${this.url}`, rating, this.getOptions()).subscribe();
        } else {
			return this.http.put<Rating>(`${environment.apiUrl}/${this.url}`, rating, this.getOptions()).subscribe();
        }
	}


    public deleteRating(id: string){
        return this.http.delete<Rating>(`${environment.apiUrl}/${this.url}/${id}`, this.getOptions());
    }

    private getOptions() {
		return {
			headers: new HttpHeaders({
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			})
		}
	}
}
