import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent {

    public constructor(private productService: ProductService, private imageService: ImageService) {
    }

    public get featuredProducts(): Product[] {
        return this.productService.getProducts().slice(0, 3);
    }

    public get latestProducts(): Product[] {
        return this.productService.getProducts().slice(-6);
    }

    public get featuredProduct(): Product {
        return (this.featuredProducts[0]) ? this.featuredProducts[0] : new Product();
    }

    public productImage(img: string | undefined) {
        return this.imageService.getImageUrl(img);
    }
}
