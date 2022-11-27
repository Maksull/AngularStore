import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url: string = "categories";
  private categories: Category[] = [];

  public constructor(private http: HttpClient, private authService: AuthService) {
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
      this.http.post<Category>(`${environment.apiUrl}/${this.url}`, category, this.getOptions()).subscribe({
        next: (c: Category) => {
          this.categories.push(c)
        },
        error: (err: HttpErrorResponse) => {
          this.authService.logout();
        }
      });
    } else {
      this.http.put<Category>(`${environment.apiUrl}/${this.url}`, category, this.getOptions()).subscribe({
        next: (c: Category) => {
          this.categories.splice(this.categories.findIndex(c => c.categoryId == category.categoryId), 1, category);
        },
        error: (err: HttpErrorResponse) => {
          this.authService.logout();
        }
      })
    }
  }

  public deleteCategory(id: number) {
    this.http.delete<Category>(`${environment.apiUrl}/${this.url}/${id}`, this.getOptions()).subscribe({
      next: (c: Category) => {
        this.categories.splice(this.categories.findIndex(c => c.categoryId == id), 1);
      },
      error: (err: HttpErrorResponse) => {
        this.authService.logout();
      }
    });
  }

  public afterCreateUpdateProduct(product: Product, lastCategoryId: number) {
    this.categories.find(c => c.categoryId == lastCategoryId)?.products?.splice(
      (this.categories.find(c => c.categoryId == lastCategoryId)?.products ?? []).findIndex(p => p.productId == product.productId), 1
    );
    this.categories.find(c => c.categoryId == product.categoryId)?.products?.push(product);
  }

  public afterDeleteProduct(product: Product | undefined) {
    if (product != undefined) {
      this.categories.find(c => c.categoryId == product.categoryId)?.products?.splice(
        (this.categories.find(c => c.categoryId == product.categoryId)?.products ?? []).findIndex(p => p.productId == product.productId), 1
      );
    }
  }

  private getOptions() {
    return {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    }
  }
}
