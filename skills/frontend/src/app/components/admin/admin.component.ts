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
  book: Book = {} as Book;  // Initialize with an empty object first
  books: Book[] = [];

  showAddBookForm: boolean = false;
  selectedBook: Book | null = null;
  showUpdateForm: boolean = false;

  constructor(private bookService: BookService, private authService: AuthService) { }

  ngOnInit(): void {
    // ✅ Set the user_id dynamically once authService is ready
    const userId = this.authService.getUserId();
    this.book = this.resetBook(userId); // Pass userId to resetBook()
    
    // Fetch books when the component loads
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (books: Book[]) => {
        this.books = books;
      },
      error: (error) => {
        console.error('Error fetching books:', error);
        alert('Failed to fetch books. Please try again.');
      }
    });
  }

  addBook(): void {
    this.book.user_id = this.authService.getUserId(); // Ensure correct user_id for new book

    // Validate available copies
    if (this.book.available_copies > this.book.total_copies) {
      alert('Available copies cannot exceed total copies.');
      return;
    }

    // Call API to add the book
    this.bookService.addBook(this.book).subscribe({
      next: (newBook: Book) => {
        this.books.push(newBook);
        this.book = this.resetBook(this.authService.getUserId());  // Reset form after adding the book
        alert('Book added successfully!');
      },
      error: (error) => {
        console.error('Error adding book:', error);
        alert('Failed to add book. Please try again.');
      }
    });
  }

  deleteBook(bookId: number): void {
    console.log("Deleting book with ID:", bookId);  // Debugging step
    if (confirm("Are you sure you want to delete this book?")) {
      this.bookService.deleteBook(bookId).subscribe({
        next: () => {
          this.books = this.books.filter(book => book.id !== bookId);
          alert("Book deleted successfully!");
        },
        error: (error) => {
          console.error("Error deleting book:", error);
          alert("Failed to delete book. Please try again.");
        }
      });
    }
  }

  editBook(book: Book): void {
    this.selectedBook = { ...book };
    this.showUpdateForm = true;
  }

  updateBook(): void {
    if (!this.selectedBook) return;

    this.bookService.updateBookAsAdmin(this.selectedBook.id, this.selectedBook).subscribe({
      next: (updatedBook) => {
        this.books = this.books.map(b => b.id === updatedBook.id ? updatedBook : b);
        this.showUpdateForm = false;
        this.selectedBook = null;
        alert('Book updated successfully!');
      },
      error: () => alert('Failed to update book.')
    });
  }

  private resetBook(userId: number): Book {
    return {
      id: 0,
      user_id: userId,  // Dynamically assign user_id here
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

  toggleAddBookForm(): void {
    this.showAddBookForm = !this.showAddBookForm;
  }
}
