import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = "auth";
  public authToken?: string;

  public constructor(private http: HttpClient) { }

  public authenticate(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/${this.url}/login`, {
      username: username, password: password
    });
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
