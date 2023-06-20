import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSummaryComponent } from './cart-summary.component';
import { Cart } from 'src/app/models/cart';

describe('CartSummaryComponent', () => {
    let component: CartSummaryComponent;
    let fixture: ComponentFixture<CartSummaryComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CartSummaryComponent],
            providers: [Cart]
        });
        fixture = TestBed.createComponent(CartSummaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
