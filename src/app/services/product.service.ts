import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CategoryService } from './category.service';
import { SupplierService } from './supplier.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Rating } from '../models/rating';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private url: string = "products";
    private products: Product[] = [];

    public constructor(private http: HttpClient, private categoryService: CategoryService, private supplierService: SupplierService, private router: Router,
        private authService: AuthService) {
        http.get<Product[]>(`${environment.apiUrl}/${this.url}`).subscribe((result: Product[]) => (this.products = result));
    }

    public getProducts(selectedCategory?: string): Product[] {
        return this.products.filter(p => selectedCategory == undefined || p.category?.name == selectedCategory);
    }

    public getProduct(id: number): Observable<Product> {
        return this.http.get<Product>(`${environment.apiUrl}/${this.url}/${id}`);
    }

    public getProductRatings(productId: number){
        return this.http.get<Rating[]>(`${environment.apiUrl}/ratings/productId/${productId}`);
    }

    public saveProduct(product: FormData) {
        if (product.get('productId') == null || product.get('productId') == '0') {
            this.http.post<Product>(`${environment.apiUrl}/${this.url}`, product, this.getOptions()).subscribe({
                next: (p: Product) => {
                    p.category = this.categoryService.getCategories().find(c => c.categoryId == p.categoryId);
                    p.supplier = this.supplierService.getSuppliers().find(s => s.supplierId == p.supplierId);
                    this.products.push(p);
                },
                error: (err: HttpErrorResponse) => {
                    this.authService.logout();
                }
            });
        } else {
            this.http.put<Product>(`${environment.apiUrl}/${this.url}`, product, this.getOptions()).subscribe({
                next: (p: Product) => {
                    p.category = this.categoryService.getCategories().find(c => c.categoryId == p.categoryId);
                    p.supplier = this.supplierService.getSuppliers().find(s => s.supplierId == p.supplierId);
                    this.products.splice(this.products.findIndex(p => p.productId?.toString() == product.get('productId')), 1, p);
                },
                error: (err: HttpErrorResponse) => {
                    this.authService.logout();
                }
            });
        }
    }

    public deleteProduct(id: number) {
        this.http.delete<Product>(`${environment.apiUrl}/${this.url}/${id}`, this.getOptions()).subscribe({
            next: (p: Product) => {
                this.products.splice(this.products.findIndex(p => p.productId == id), 1)
            },
            error: (err: HttpErrorResponse) => {
                this.authService.logout();
            }
        });
    }

    public afterDeleteCategory(id: number) {
        this.products = this.products.filter(p => p.categoryId != id);
    }

    public afterDeleteSupplier(id: number) {
        this.products = this.products.filter(p => p.supplierId != id);
    }

    private getOptions() {
        return {
            headers: new HttpHeaders({
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            })
        }
    }
}
