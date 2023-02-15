import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
  ) { }

  getUser(): Observable<any> {
    return this.http.get(environment.mockApiUsers);
  }

  createUser(name: string, email: string): Observable<any> {
    return this.http.post(environment.mockApiUsers, {
      name: name,
      email: email
    });
  }

  updateEmail(email: string, id: Number): Observable<any> {
    return this.http.put(`${environment.mockApiUsers}/${id}`, {
      email: email
    });
  }

  dropUser(id: Number): Observable<any> {
    return this.http.delete(`${environment.mockApiUsers}/${id}`);
  }
}
