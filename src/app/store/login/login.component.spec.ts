import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: AuthService;
    let router: Router;
    let mockIndicatorElement: HTMLElement | null;
    let formBuilder: FormBuilder;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [ReactiveFormsModule],
            providers: [
                FormBuilder,
                { provide: AuthService, useValue: { login: () => { } } },
                { provide: Router, useValue: {} },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthService);
        router = TestBed.inject(Router);
        mockIndicatorElement = document.createElement('div');
        spyOn(document, 'getElementById').and.returnValue(mockIndicatorElement);
        formBuilder = TestBed.inject(FormBuilder);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle isLogin to true and update Indicator style in toggleLogin()', () => {
        component.toggleLogin();
        expect(component.isLogin).toBe(true);
        expect(document.getElementById('Indicator')!.style.marginLeft).toBe('2.8rem');
        expect(component.errors).toEqual([]);
    });

    it('should toggle isLogin to false and update Indicator style in toggleRegister()', () => {
        component.toggleRegister();
        expect(component.isLogin).toBe(false);
        expect(document.getElementById('Indicator')!.style.marginLeft).toBe('15.5rem');
        expect(component.errors).toEqual([]);
    });

    it('should reset isRegisted, isLogin, hide, and errors, and generate a new registerForm', () => {
        component.registed();
        expect(component.isRegisted).toBe(false);
        expect(component.isLogin).toBe(true);
        expect(component.hide).toBe(true);
        expect(component.errors).toEqual([]);
        expect(component.registerForm).toBeDefined();
    });
});