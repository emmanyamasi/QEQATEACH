import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/bookslist';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-librarian',
  imports: [FormsModule,CommonModule],
  templateUrl: './librarian.component.html',
  styleUrl: './librarian.component.css'
})
export class LibrarianComponent implements OnInit {
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
showAddBookForm: any;

  constructor(private bookService: BookService, private authService: AuthService) {}

  ngOnInit(): void {
    // ✅ Set user_id dynamically
    this.book.user_id = this.authService.getUserId();
    this.loadLibrarianBooks();
  }

  addBookL(): void {
    this.book.user_id = this.authService.getUserId(); // ✅ Ensure correct user_id

    // Validate available copies
    if (this.book.available_copies > this.book.total_copies) {
      alert('Available copies cannot exceed total copies.');
      return;
    }

    // Call API to add the book
    this.bookService.addBookL(this.book).subscribe({
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

  loadLibrarianBooks(): void {
    this.bookService.getLibrarianBooks().subscribe({
        next: (books: Book[]) => {
            this.books = books;
        },
        error: (error) => {
            console.error('Error fetching books:', error);
        }
    });
}


deleteBookL(bookId: number): void {
  console.log("Deleting book with ID:", bookId); // Debugging step
  if (confirm("Are you sure you want to delete this book?")) {
    this.bookService.deleteBookL(bookId).subscribe({
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
  toggleAddBookForm(): void { // Add this method
    this.showAddBookForm = !this.showAddBookForm;
  }

}

