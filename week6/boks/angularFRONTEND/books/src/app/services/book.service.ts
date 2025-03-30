import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/bookslist';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:3000/api/v1/books';

  constructor(private http: HttpClient) {}

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/admin`, book); // No manual headers needed
  }
  addBookL(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/librarian`, book); // No manual headers needed
  }
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}`); // Assuming this endpoint returns all books
  }

}
