export interface Book {
    id: number; // Primary key
    user_id: number;
    title: string;
    author: string;
    genre: string;
    year: number;
    pages: number;
    publisher: string;
    description: string;
    price: number;
    total_copies: number; // Total number of copies in the library
    available_copies: number; // Number of copies currently available for borrowing
    created_at?: Date;
    updated_at?: Date;
  }

