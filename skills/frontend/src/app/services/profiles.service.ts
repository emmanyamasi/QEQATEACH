// src/app/services/profiles.service.ts

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileResponse } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  private apiUrl = 'http://localhost:3000/api/v1/profile';

  constructor(private http: HttpClient) { }

  // GET profile
  getUserProfile(): Observable<ProfileResponse> {
    const headers = this.getAuthHeaders();
    return this.http.get<ProfileResponse>(`${this.apiUrl}/me`, { headers });
  }

  // 🔄 UPDATE profile
  updateUserProfile(data: { name: string; email: string }): Observable<ProfileResponse> {
    const headers = this.getAuthHeaders();
    return this.http.put<ProfileResponse>(`${this.apiUrl}`, data, { headers });
  }

  // Utility: Get token and set headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}
