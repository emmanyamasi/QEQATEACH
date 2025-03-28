import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/bookslist';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  book: Book = {
    id: 0, 
    user_id: 0, // Set dynamically in ngOnInit()
    title: '',
    author: '',
    genre: '',
    year: 0,
    pages: 0,
    publisher: '',
    description: '',
    price: 0,
    total_copies: 0,
    available_copies: 0,
    created_at: undefined,
    updated_at: undefined
  };

  books: Book[] = [];

  constructor(private bookService: BookService, private authService: AuthService) {}

  ngOnInit(): void {
    // ✅ Set user_id dynamically
    this.book.user_id = this.authService.getUserId();
    
    // Fetch books when the component loads
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (books: Book[]) => {
        this.books = books;
      },
      error: (error) => {
        console.error('Error fetching books:', error);
        alert('Failed to load books. Please try again.');
      }
    });
  }

  addBook(): void {
    this.book.user_id = this.authService.getUserId(); // ✅ Ensure correct user_id

    // Validate available copies
    if (this.book.available_copies > this.book.total_copies) {
      alert('Available copies cannot exceed total copies.');
      return;
    }

    // Call API to add the book
    this.bookService.addBook(this.book).subscribe({
      next: (newBook: Book) => {
        this.books.push(newBook);
        this.resetForm();
        alert('Book added successfully!');
      },
      error: (error) => {
        console.error('Error adding book:', error);
        alert('Failed to add book. Please try again.');
      }
    });
  }

  // deleteBook(bookId: number): void {
  //   if (!confirm('Are you sure you want to delete this book?')) return;

  //   this.bookService.deleteBook(bookId).subscribe({
  //     next: () => {
  //       this.books = this.books.filter(book => book.id !== bookId);
  //       alert('Book deleted successfully!');
  //     },
  //     error: (error) => {
  //       console.error('Error deleting book:', error);
  //       alert('Failed to delete book. Please try again.');
  //     }
  //   });
  // }

  // updateBook(book: Book): void {
  //   this.bookService.updateBook(book).subscribe({
  //     next: (updatedBook: Book) => {
  //       this.books = this.books.map(b => (b.id === updatedBook.id ? updatedBook : b));
  //       alert('Book updated successfully!');
  //     },
  //     error: (error) => {
  //       console.error('Error updating book:', error);
  //       alert('Failed to update book. Please try again.');
  //     }
  //   });
  // }

  private resetForm(): void {
    this.book = {
      id: 0,
      user_id: this.authService.getUserId(), // ✅ Reset with correct user_id
      title: '',
      author: '',
      genre: '',
      year: 0,
      pages: 0,
      publisher: '',
      description: '',
      price: 0,
      total_copies: 0,
      available_copies: 0,
      created_at: undefined,
      updated_at: undefined
    };
  }
}
