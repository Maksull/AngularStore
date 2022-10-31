import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginDto } from '../models/dto/loginDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = "auth";
  public authToken?: string;

  public constructor(private http: HttpClient) { }

  public authenticate(loginDto: LoginDto) {
    return this.http.post<any>(`${environment.apiUrl}/${this.url}/login`, loginDto);
  }

  public get isAuthenticated(): boolean {
    return this.authToken != null;
  }

  public logout() {
    this.authToken = undefined;
    localStorage.removeItem("token");
  }

  public clear() {
    this.authToken = undefined;
  }
}
