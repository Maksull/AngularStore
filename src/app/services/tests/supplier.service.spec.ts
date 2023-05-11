import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { SupplierService } from '../supplier.service';

describe('SupplierService', () => {
  let service: SupplierService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SupplierService]
    });
    service = TestBed.inject(SupplierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
