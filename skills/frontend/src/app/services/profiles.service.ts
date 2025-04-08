// src/app/services/profiles.service.ts

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileResponse } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  private apiUrl = 'http://localhost:3000/api/v1/profile';  // Your base API URL

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

  // Fetch skill categories
  getSkillCategories(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/v1/skill-categories'); // Adjust endpoint
  }

  // Fetch all skills
  getAllSkills(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/v1/skills'); // Adjust endpoint
  }

  // Save jobseeker profile
  saveJobSeekerProfile(profileData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.apiUrl}/jobseeker-profile`, profileData, { headers });
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
