import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private url: string = "images";

  constructor(private http: HttpClient) { }


  public getImageUrl(img: string | undefined) {
    return `${environment.apiUrl}/${this.url}/request?key=${img}`;
  }
}
