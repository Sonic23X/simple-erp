import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any = localStorage.getItem('token')

  constructor(
    private http: HttpClient,
  ) { }

  getToken(): any {
    return this.token;
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  access(login: Login): Observable<any> {
    return this.http.post(`${environment.api}/login`, login);
  }
}
