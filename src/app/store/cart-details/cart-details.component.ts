import { Component } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { ImageService } from 'src/app/services/image.service';

@Component({
    selector: 'app-cart-details',
    templateUrl: './cart-details.component.html',
    styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent {

    public constructor(public cart: Cart, private imageService: ImageService) { }

    public productImage(img: string | undefined) {
        return this.imageService.getImageUrl(img);
    }
}
