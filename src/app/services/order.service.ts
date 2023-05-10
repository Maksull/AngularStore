import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private url: string = "orders"
    private orders: Order[] = [];

    public constructor(private http: HttpClient) {
        this.http.get<Order[]>(`${environment.apiUrl}/${this.url}`, this.getOptions()).subscribe((result: Order[]) => (this.orders = result));
    }

    public getOrders(): Order[] {
        return this.orders;
    }

    public getOrder(id: number): Order | undefined {
        return this.orders.find(o => o.orderId == id);
    }

    public getOrderByUser() {
        return this.http.get<Order[]>(`${environment.apiUrl}/${this.url}/userId`, this.getOptions());
    }

    public saveOrder(order: Order) {
        if (order.orderId == null || order.orderId == 0) {
            this.http.post<Order>(`${environment.apiUrl}/${this.url}`, order, this.getOptions()).subscribe(o => this.orders.push(o));;
        } else {
            this.http.put<Order>(`${environment.apiUrl}/${this.url}`, order, this.getOptions()).subscribe(o => {
                this.orders.splice(this.orders.findIndex(o => o.orderId == order.orderId), 1, order)
            });
        }
    }

    public deleteOrder(id: number) {
        this.http.delete<Order>(`${environment.apiUrl}/${this.url}/${id}`, this.getOptions()).subscribe(o => {
            this.orders.splice(this.orders.findIndex(o => o.orderId == id), 1)
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
