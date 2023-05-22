import { SupplierService } from './supplier.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Supplier } from '../models/supplier';

describe('SupplierService', () => {
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy };
  let authServiceSpy: { logout: jasmine.Spy };
  let supplierService: SupplierService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    supplierService = new SupplierService(httpClientSpy as any, authServiceSpy as any);
  });

  it('should retrieve suppliers', () => {
    const mockSuppliers: Supplier[] = [
      { supplierId: 1, name: 'Supplier 1' },
      { supplierId: 2, name: 'Supplier 2' }
    ];
    httpClientSpy.get.and.returnValue(of(mockSuppliers));

    supplierService.getSuppliers();

    expect(httpClientSpy.get.calls.count()).toBe(1);
    expect(httpClientSpy.get.calls.first().args[0]).toBe(`${environment.apiUrl}/suppliers`);
    expect(supplierService.getSuppliers()).toEqual(mockSuppliers);
  });

  it('should retrieve a specific supplier', () => {
    const mockSuppliers: Supplier[] = [
      { supplierId: 1, name: 'Supplier 1' },
      { supplierId: 2, name: 'Supplier 2' }
    ];
    httpClientSpy.get.and.returnValue(of(mockSuppliers));

    expect(supplierService.getSupplier(1)).toEqual({ supplierId: 1, name: 'Supplier 1' });
    expect(supplierService.getSupplier(3)).toBeUndefined();
  });

  it('should save a new supplier', () => {
    const mockSupplier: Supplier = { supplierId: 0, name: 'New Supplier' };
    httpClientSpy.post.and.returnValue(of(mockSupplier));

    supplierService.saveSupplier(mockSupplier);

    expect(httpClientSpy.post.calls.count()).toBe(1);
    expect(httpClientSpy.post.calls.first().args[0]).toBe(`${environment.apiUrl}/suppliers`);
    expect(httpClientSpy.post.calls.first().args[1]).toBe(mockSupplier);
    expect(supplierService.getSuppliers().length).toBe(1);
    expect(supplierService.getSuppliers()[0]).toBe(mockSupplier);
  });

  it('should save an existing supplier', () => {
    const mockSupplier: Supplier = { supplierId: 1, name: 'Existing Supplier' };
    httpClientSpy.put.and.returnValue(of(mockSupplier));

    supplierService.saveSupplier(mockSupplier);

    expect(httpClientSpy.put.calls.count()).toBe(1);
    expect(httpClientSpy.put.calls.first().args[0]).toBe(`${environment.apiUrl}/suppliers`);
    expect(httpClientSpy.put.calls.first().args[1]).toBe(mockSupplier);
    expect(supplierService.getSuppliers().length).toBe(1);
    expect(supplierService.getSuppliers()[0]).toBe(mockSupplier);
  });

  it('should delete a supplier', () => {
    const mockSupplier: Supplier = { supplierId: 1, name: 'Supplier 1' };
    httpClientSpy.delete.and.returnValue(of(mockSupplier));
    supplierService['suppliers'] = [mockSupplier];

    supplierService.deleteSupplier(1);

    expect(httpClientSpy.delete.calls.count()).toBe(1);
    expect(httpClientSpy.delete.calls.first().args[0]).toBe(`${environment.apiUrl}/suppliers/1`);
    expect(supplierService.getSuppliers().length).toBe(0);
  });

  it('should handle save supplier error', () => {
    const mockSupplier: Supplier = { supplierId: 0, name: 'New Supplier' };
    const mockError = new HttpErrorResponse({ status: 500 });
    httpClientSpy.post.and.returnValue(throwError(mockError));

    supplierService.saveSupplier(mockSupplier);

    expect(authServiceSpy.logout.calls.count()).toBe(1);
  });

  it('should handle delete supplier error', () => {
    const mockSupplier: Supplier = { supplierId: 1, name: 'Supplier 1' };
    const mockError = new HttpErrorResponse({ status: 500 });
    httpClientSpy.delete.and.returnValue(throwError(mockError));
    supplierService['suppliers'] = [mockSupplier];

    supplierService.deleteSupplier(1);

    expect(authServiceSpy.logout.calls.count()).toBe(1);
    expect(supplierService.getSuppliers().length).toBe(1);
  });

  it('should update suppliers after creating or updating a product', () => {
    const mockProduct = { productId: 1, name: 'Product 1', supplierId: 2 };
    const mockSupplier: Supplier = { supplierId: 2, name: 'Supplier 2', products: [] };
    supplierService['suppliers'] = [mockSupplier];

    supplierService.afterCreateUpdateProduct(mockProduct, 2);

    expect(mockSupplier.products!.length).toBe(1);
    expect(mockSupplier.products![0]).toBe(mockProduct);
  });

  it('should update suppliers after deleting a product', () => {
    const mockProduct = { productId: 1, name: 'Product 1', supplierId: 2 };
    const mockSupplier: Supplier = { supplierId: 2, name: 'Supplier 2', products: [mockProduct] };
    supplierService['suppliers'] = [mockSupplier];

    supplierService.afterDeleteProduct(mockProduct);

    expect(mockSupplier.products!.length).toBe(0);
  });

  it('should not update suppliers when deleting a non-existent product', () => {
    const mockProduct = { productId: 1, name: 'Product 1', supplierId: 2 };
    const mockSupplier: Supplier = { supplierId: 2, name: 'Supplier 2', products: [mockProduct] };
    supplierService['suppliers'] = [mockSupplier];

    supplierService.afterDeleteProduct(undefined);

    expect(mockSupplier.products!.length).toBe(1);
  });

  it('should include authorization token in request headers', () => {
    spyOn(localStorage, 'getItem').and.returnValue('mockToken');
    const mockOptions = { headers: jasmine.any(Object) };
    httpClientSpy.post.and.returnValue(of(null));

    supplierService.saveSupplier({ supplierId: 0, name: 'New Supplier' });

    expect(httpClientSpy.post.calls.first().args[2]).toEqual(mockOptions);
    expect(httpClientSpy.post.calls.first().args[2].headers.get('Authorization')).toBe('Bearer mockToken');
  });
});
