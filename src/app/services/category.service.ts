import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url: string = "categories";
  private categories: Category[] = [];

  public constructor(private http: HttpClient) {
    this.http.get<Category[]>(`${environment.apiUrl}/${this.url}`).subscribe((result: Category[]) => (this.categories = result));
  }

  public getCategories(): Category[] {
    return this.categories;
  }

  public getCategory(id: number): Category | undefined {
    return this.categories.find(c => c.categoryId == id);
  }

  public saveCategory(category: Category) {
    if (category.categoryId == null || category.categoryId == 0) {
      this.http.post<Category>(`${environment.apiUrl}/${this.url}`, category, this.getOptions()).subscribe(c => this.categories.push(c));
    } else {
      this.http.put<Category>(`${environment.apiUrl}/`, category, this.getOptions()).subscribe(c => {
        this.categories.splice(this.categories.findIndex(c => c.categoryId == category.categoryId), 1, category)
      })
    }
  }

  public deleteCategory(id: number){
    this.http.delete<Category>(`${environment.apiUrl}/${this.url}/${id}`, this.getOptions()).subscribe(c => {
      this.categories.splice(this.categories.findIndex(c => c.categoryId == id), 1)
    });
  }

  private getOptions(){
    return {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    }
  }
}
