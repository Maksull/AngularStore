import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';
import { Cart } from 'src/app/models/cart';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let menuItemsElement: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderComponent, CartSummaryComponent],
            providers: [Cart]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        menuItemsElement = fixture.nativeElement.querySelector('#MenuItems');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle menuItems maxHeight', () => {
        // Initial state
        expect(menuItemsElement.style.maxHeight).toBe('');
    
        // Toggle menu
        component.toggleMenu();
        fixture.detectChanges();
        expect(menuItemsElement.style.maxHeight).toBe('200px');
    
        // Toggle menu again
        component.toggleMenu();
        fixture.detectChanges();
        expect(menuItemsElement.style.maxHeight).toBe('0px');
      });
});