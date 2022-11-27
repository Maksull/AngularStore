import { Component } from "@angular/core";
import { Cart } from "src/app/models/cart";
import { ImageService } from "src/app/services/image.service";

@Component({
    templateUrl: "cartDetails.component.html"
})
export class CartDetailsComponent {

    public constructor(public cart: Cart, private imageService: ImageService) {}

    public productImage(img: string | undefined) {
        return this.imageService.getImageUrl(img);
    }
}