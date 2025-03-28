import { Injectable } from '@angular/core';
import { Book } from '../models/bookslist';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  private apiUrl = 'http://localhost:3000/api/v1/books';

  constructor(private http: HttpClient) { }
  
  // Get token from localStorage and set headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Fetch all books
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Add a new book (Admin only)
  addBook(book: Book): Observable<Book> {
    console.log("Book Data Sent to Backend:", book);
    return this.http.post<Book>(`${this.apiUrl}/admin`, book, { headers: this.getHeaders() });
  }
}
