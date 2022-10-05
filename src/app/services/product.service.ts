import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string = "products";
  private products: Product[] = [];

  public constructor(private http: HttpClient) {
    http.get<Product[]>(`${environment.apiUrl}/${this.url}`).subscribe((result: Product[]) => (this.products = result));
  }

  public getProducts(selectedCategory?: string): Product[] {
    return this.products.filter(p => selectedCategory == undefined || p.category?.name == selectedCategory);
  }

  public getProduct(id: number): Product | undefined {
    return this.products.find(p => p.productId == id);
  }

  public saveProduct(product: Product) {
    if (product.productId == null || product.productId == 0) {
      this.http.post<Product>(`${environment.apiUrl}/${this.url}`, product, this.getOptions()).subscribe(p => this.products.push(p));
    } else {
      this.http.put<Product>(`${environment.apiUrl}/${this.url}`, product, this.getOptions()).subscribe(p => {
        this.products.splice(this.products.findIndex(p => p.productId == product.productId), 1, product)
      });
    }
  }

  public deleteProduct(id: number){
    this.http.delete<Product>(`${environment.apiUrl}/${this.url}/${id}`, this.getOptions()).subscribe(p => {
      this.products.splice(this.products.findIndex(p => p.productId == id), 1)
    });
  }

  private getOptions() {
    return {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    }
  }
}
