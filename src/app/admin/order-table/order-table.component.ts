import { Component, IterableDiffer, IterableDiffers } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
    selector: 'app-order-table',
    templateUrl: './order-table.component.html',
    styleUrls: ['./order-table.component.css', '../admin/admin.component.css']
})
export class OrderTableComponent {
    private differ: IterableDiffer<Order>;
    public colsAndRows: string[] = ["name", "email", "address", "city", "country", "zip", "cart_p", "cart_q", "buttons"];
    public tableDataSource!: MatTableDataSource<Order>;
    private ordersLoaded: boolean = false;

    public constructor(private orderService: OrderService, differs: IterableDiffers) {
        this.differ = differs.find([]).create(null!);
    }

    ngOnInit() {
        this.orderService.getOrders().subscribe(orders => {
            this.tableDataSource = new MatTableDataSource<Order>(orders);
            this.tableDataSource.filter = "true";
            this.tableDataSource.filterPredicate = (order, include) => {
                return !order.isShipped || include.toString() == "true";
            };
            this.ordersLoaded = true;
        });
    }

    public ngDoCheck() {
        if (this.tableDataSource && this.ordersLoaded) {
            let changes = this.differ.diff(this.tableDataSource.data);
            if (changes != null) {
                this.orderService.getOrders().subscribe(orders => {
                    this.tableDataSource.data = orders;
                    this.ordersLoaded = false;
                });
            }
        }
    }

    public get includeShipped(): boolean {
        return this.tableDataSource?.filter == "true";
    }

    public set includeShipped(include: boolean) {
        console.log(include);
        this.tableDataSource.filter = include.toString();
    }

    public toggleShipped(order: Order) {
        console.log(order);
        order.isShipped = !order.isShipped;
        this.orderService.saveOrder(order);
    }

    public deleteOrder(id: number) {
        this.orderService.deleteOrder(id);
    }
}
