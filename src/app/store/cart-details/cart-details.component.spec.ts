import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDetailsComponent } from './cart-details.component';
import { Cart } from 'src/app/models/cart';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CartDetailsComponent', () => {
    let component: CartDetailsComponent;
    let fixture: ComponentFixture<CartDetailsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [CartDetailsComponent],
            providers: [Cart]
        });
        fixture = TestBed.createComponent(CartDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
