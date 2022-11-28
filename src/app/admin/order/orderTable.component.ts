import { Component, IterableDiffer, IterableDiffers } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Order } from "src/app/models/order";
import { OrderService } from "src/app/services/order.service";

@Component({
    templateUrl: "orderTable.component.html"
})
export class OrderTableComponent {
    private differ: IterableDiffer<Order>;
    public colsAndRows: string[] = ["name", "email", "address", "city", "country", "zip", "cart_p", "cart_q", "buttons"];
    public tableDataSource = new MatTableDataSource<Order>(this.orderService.getOrders());

    public constructor(private orderService: OrderService, differs: IterableDiffers) {
        this.differ = differs.find(orderService.getOrders()).create();
        this.tableDataSource.filter = "true";
        this.tableDataSource.filterPredicate = (order, include) => {
            return !order.isShipped || include.toString() == "true";
        };
    }

    public ngDoCheck() {
        let changes = this.differ.diff(this.orderService.getOrders());
        if(changes != null){
            this.tableDataSource.data = this.orderService.getOrders();
        }
    }

    public get includeShipped(): boolean {
        return this.tableDataSource.filter == "true";
    }

    public set includeShipped(include: boolean) {
        this.tableDataSource.filter = include.toString();
    }

    public toggleShipped(order: Order) {
        order.isShipped = !order.isShipped;
        this.orderService.saveOrder(order);
    }

    public deleteOrder(id: number) {
        this.orderService.deleteOrder(id);
    }
}
