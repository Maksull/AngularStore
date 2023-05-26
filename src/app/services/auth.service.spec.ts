import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { LoginRequest } from '../models/loginRequest';
import { JwtResponse } from '../models/jwtResponse';
import { RefreshTokenRequest } from '../models/refreshTokenRequest';
import { RegisterRequest } from '../models/registerRequest';


describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterModule],
            providers: [AuthService]
        });
        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
        router = TestBed.inject(Router);
    });


    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get if useris authenticated', () => {
        service.validate().subscribe((result: any) => {
            expect(result).toEqual(true);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/auth/protected`);
        expect(req.request.method).toBe('GET');
        req.flush(true);
    });

    it('should get if useris authenticated as admin', () => {
        service.validateAdmin().subscribe((result: any) => {
            expect(result).toEqual(true);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/auth/adminProtected`);
        expect(req.request.method).toBe('GET');
        req.flush(true);
    });

    it('should return account', () => {
        const account: Account = {
            username: "Username",
            firstName: "Firstname",
            lastName: "Lastname",
            email: "email",
            phoneNumber: "phoneNumber"
        };

        service.getAccountData().subscribe((result: Account) => {
            expect(result).toBe(account);
        })

        const req = httpMock.expectOne(`${environment.apiUrl}/auth/userData`);
        expect(req.request.method).toBe('GET');
        req.flush(account);
    });

    it('should login', () => {
        // Arrange
        const login: LoginRequest = {
            username: "username",
            password: "password",
        };
        const mockRefreshToken: RefreshTokenRequest = {
            token: "",
            expired: "",
        };
        const mockJwtResponse: JwtResponse = {
            jwt: "",
            refreshToken: mockRefreshToken,
        };

        // Act
        let actualResponse: JwtResponse | undefined;
        service.login(login).subscribe((result: any) => {
            actualResponse = result;
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
        req.flush(mockJwtResponse);

        // Assert
        expect(actualResponse).toEqual(mockJwtResponse);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toBe(login);
    });


    it('should register', () => {
        //Arrange
        const register: RegisterRequest = {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
        const expectedResponse = { message: 'Registration successful' };

        //Act
        let response: any;
        service.register(register).subscribe((result: any) => {
            response = result;
        })

        const req = httpMock.expectOne(`${environment.apiUrl}/auth/register`);
        req.flush(expectedResponse);

        //Assert
        expect(response).toBe(expectedResponse);
    });

    it('should refresh', () => {
        //Arrange
        const refresh: RefreshTokenRequest = {
            token: "",
            expired: "",
        };
        const mockRefreshToken: RefreshTokenRequest = {
            token: "",
            expired: "",
        };
        const mockJwtResponse: JwtResponse = {
            jwt: "",
            refreshToken: mockRefreshToken,
        };

        //Act
        let response: JwtResponse | undefined;
        service.refresh(refresh).subscribe((result: JwtResponse) => {
            response = result;
        })

        const req = httpMock.expectOne(`${environment.apiUrl}/auth/refresh`);
        req.flush(mockJwtResponse);

        //Assert
        expect(response).toBe(mockJwtResponse);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toBe(refresh);
    });


    it('should logout and navigate to "/admin/auth"', () => {
        // Arrange
        spyOn(router, 'navigateByUrl');
        localStorage.setItem('token', 'dummyToken');
        localStorage.setItem('refreshToken', 'dummyRefreshToken');
        localStorage.setItem('refreshTokenExpired', 'dummyRefreshTokenExpired');

        // Act
        service.logout();

        // Assert
        expect(service.isAuthenticated).toBeFalse();
        expect(service.isAdmin).toBeFalse();
        expect(localStorage.getItem('token')).toBeNull();
        expect(localStorage.getItem('refreshToken')).toBeNull();
        expect(localStorage.getItem('refreshTokenExpired')).toBeNull();
        expect(router.navigateByUrl).toHaveBeenCalledWith('/admin/auth');
    });
});
