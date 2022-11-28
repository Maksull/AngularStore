import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginDto } from '../models/dto/loginDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = "auth";
  public authToken?: string;

  public constructor(private http: HttpClient, private router: Router) { }

  public authenticate(loginDto: LoginDto) {
    return this.http.post<any>(`${environment.apiUrl}/${this.url}/login`, loginDto);
  }

  public validate(jwt: string){
    return this.http.post<any>(`${environment.apiUrl}/${this.url}/validate`, {jwt});
  }

  public get isAuthenticated(): boolean {
    return this.authToken != null;
  }

  public logout() {
    this.authToken = undefined;
    localStorage.removeItem("token");
    this.router.navigateByUrl("/admin/auth");
  }

  public clear() {
    this.authToken = undefined;
  }
}
