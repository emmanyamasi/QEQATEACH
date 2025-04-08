import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileResponse } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  private apiUrl = 'http://localhost:3000/api/v1/profile';

  constructor(private http:HttpClient) { }


  getUserProfile(): Observable<ProfileResponse> {
    const token = localStorage.getItem('token'); // Get the token from local storage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Include the token in the Authorization header
    });

    return this.http.get<ProfileResponse>(`${this.apiUrl}/me`, { headers });
  }
}