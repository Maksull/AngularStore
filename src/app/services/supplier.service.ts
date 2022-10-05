import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Supplier } from '../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private url: string = "suppliers";
  private suppliers: Supplier[] = [];

  public constructor(private http: HttpClient) {
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
      this.http.post<Supplier>(`${environment.apiUrl}/${this.url}`, supplier, this.getOptions()).subscribe(s => this.suppliers.push(s));
    } else {
      this.http.put<Supplier>(`${environment.apiUrl}/${this.url}`, supplier, this.getOptions()).subscribe(s => {
        this.suppliers.splice(this.suppliers.findIndex(s => s.supplierId == supplier.supplierId), 1, supplier)
      })
    }
  }

  public deleteSupplier(id: number){
    this.http.delete<Supplier>(`${environment.apiUrl}/${this.url}/${id}`, this.getOptions()).subscribe(s => {
      this.suppliers.splice(this.suppliers.findIndex(s => s.supplierId == id), 1)
    })
  }

  private getOptions() {
    return {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    }
  }
}
