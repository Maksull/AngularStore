import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '../models/loginRequest';
import { RegisterRequest } from '../models/registerRequest';
import { Account } from '../models/account';
import { RefreshTokenRequest } from '../models/refreshTokenRequest';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private url: string = "auth";
	public isAuthenticated: boolean = false;
	public isAdmin: boolean = false;
	public account?: Account;

	public constructor(private http: HttpClient, private router: Router) { }

	public validate() {
		return this.http.get(`${environment.apiUrl}/${this.url}/protected`, this.getOptions());
	}
	public validateAdmin() {
		return this.http.get(`${environment.apiUrl}/${this.url}/adminProtected`, this.getOptions());
	}

	public login(loginRequest: LoginRequest) {
		return this.http.post<any>(`${environment.apiUrl}/${this.url}/login`, loginRequest);
	}

	public register(registerRequest: RegisterRequest) {
		return this.http.post<any>(`${environment.apiUrl}/${this.url}/register`, registerRequest);
	}

	public getAccountData() {
		return this.http.get<Account>(`${environment.apiUrl}/${this.url}/userData`, this.getOptions());
	}

	public refresh(refreshToken: RefreshTokenRequest) {
		return this.http.post<any>(`${environment.apiUrl}/${this.url}/refresh`, refreshToken);
	}

	public logout() {
		this.isAuthenticated = false;
		this.isAdmin = false;
		localStorage.removeItem("token");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("refreshTokenExpired");
		this.router.navigateByUrl("/admin/auth");
	}

	private getOptions() {
		return {
			headers: new HttpHeaders({
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			})
		}
	}
}