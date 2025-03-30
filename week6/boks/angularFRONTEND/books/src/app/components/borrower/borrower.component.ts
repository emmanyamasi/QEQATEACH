import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/bookslist';
import { BookService } from '../../services/book.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-borrower',
  imports: [FormsModule,CommonModule],
  templateUrl: './borrower.component.html',
  styleUrl: './borrower.component.css'
})
export class BorrowersComponent implements OnInit {
  books: Book[] = []; // Store fetched books

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;  // Assign books from API response
      },
      error: (err) => {
        console.error('Error fetching books:', err);
      }
    });
  }



  
}

