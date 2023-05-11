import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

describe('ProductService', () => {
  let service: ProductService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterModule, HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    http = TestBed.inject(HttpTestingController);
  });

  // afterEach(() => {
  //   http.verify();
  // });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should return product', waitForAsync(inject(ProductService)), (service) => {
  //   const mockProducts: Product = 
  //     { productId: 2, name: "Name", description: "desc", price: 100, categoryId: 1, supplierId: 1, images: "kayak/kayak.png" }
  //   ;

  //   service.getProduct(1).subscribe(product => {
  //     console.log(product);
  //     expect(product).toEqual(mockProducts);
  //     done();
  //   })


  //   // const request = http.expectOne(`${environment.apiUrl}/products/1`);

  //   // expect(request.request.method).toBe('GET');

  //   // request.flush(mockProducts);
  // })

  it('#getObservableValue should return value from observable',
    (done: DoneFn) => {
      const mockProducts: Product =
        { productId: 2, name: "Name", description: "desc", price: 100, categoryId: 1, supplierId: 1, images: "kayak/kayak.png" }
        ;

      // service.getProduct(1).subscribe(product => {
      //   console.log(product);
      //   expect(product).toEqual(mockProducts);
      //   done();
      // })
      expectAsync(service.getProduct(1).toPromise()).toBeResolved(mockProducts);

    });
});
