import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierTableComponent } from './supplier-table.component';

describe('SupplierTableComponent', () => {
    let component: SupplierTableComponent;
    let fixture: ComponentFixture<SupplierTableComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SupplierTableComponent]
        });
        fixture = TestBed.createComponent(SupplierTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
