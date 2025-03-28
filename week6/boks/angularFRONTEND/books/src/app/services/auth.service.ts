import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse, User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/v1/auth';

  constructor(private http: HttpClient) {}

  register(user: { name: string; email: string; password: string; role_id: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, { withCredentials: true });
  }

  login(user: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, user, { withCredentials: true }).pipe(
      tap(response => {
        if (response.user) {
          localStorage.setItem('user_id', response.user.id.toString()); // ✅ Store user_id
          localStorage.setItem('role_id', response.user.role_id.toString()); // ✅ Store role_id
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user_id');
    localStorage.removeItem('role_id');
    localStorage.removeItem('token');
  }

  getUserId(): number {
    return parseInt(localStorage.getItem('user_id') || '0');
  }

  getRoleId(): number {
    return parseInt(localStorage.getItem('role_id') || '0');
  }
}
