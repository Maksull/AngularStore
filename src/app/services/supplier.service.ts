import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Supplier } from '../models/supplier';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SupplierService {
    private url: string = "suppliers";
    private suppliers: Supplier[] = [];

    public constructor(private http: HttpClient, private authService: AuthService) {
        this.http.get<Supplier[]>(`${environment.apiUrl}/${this.url}`).subscribe((result: Supplier[]) => (this.suppliers = result));
    }

    public getSuppliers(): Supplier[] {
        return this.suppliers;
    }

    public getSupplier(id: number): Supplier | undefined {
        return this.suppliers.find(s => s.supplierId == id);
    }

    public saveSupplier(supplier: Supplier) {
        if (supplier.supplierId == null || supplier.supplierId == 0) {
            this.http.post<Supplier>(`${environment.apiUrl}/${this.url}`, supplier, this.getOptions()).subscribe({
                next: (s: Supplier) => {
                    s.products = [];
                    this.suppliers.push(s);
                },
                error: (err: HttpErrorResponse) => {
                    this.authService.logout();
                }
            });
        } else {
            this.http.put<Supplier>(`${environment.apiUrl}/${this.url}`, supplier, this.getOptions()).subscribe({
                next: (s: Supplier) => {
                    this.suppliers.splice(this.suppliers.findIndex(s => s.supplierId == supplier.supplierId), 1, supplier);
                },
                error: (err: HttpErrorResponse) => {
                    this.authService.logout();
                }
            })
        }
    }

    public deleteSupplier(id: number) {
        this.http.delete<Supplier>(`${environment.apiUrl}/${this.url}/${id}`, this.getOptions()).subscribe({
            next: (s: Supplier) => {
                this.suppliers.splice(this.suppliers.findIndex(s => s.supplierId == id), 1);
            },
            error: (err: HttpErrorResponse) => {
                this.authService.logout();
            }
        })
    }

    public afterCreateUpdateProduct(product: Product, lastSupplierId: number) {
        this.suppliers.find(s => s.supplierId == lastSupplierId)?.products?.splice(
            (this.suppliers.find(s => s.supplierId == lastSupplierId)?.products ?? []).findIndex(p => p.productId == product.productId), 1
        );
        this.suppliers.find(s => s.supplierId == product.supplierId)?.products?.push(product);
    }

    public afterDeleteProduct(product: Product | undefined) {
        if (product != undefined) {
            this.suppliers.find(s => s.supplierId == product.supplierId)?.products?.splice(
                (this.suppliers.find(s => s.supplierId == product.supplierId)?.products ?? []).findIndex(p => p.productId == product.productId), 1
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
