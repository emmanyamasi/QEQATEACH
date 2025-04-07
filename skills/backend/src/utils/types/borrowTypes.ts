// borrowTypes.ts
import { Request } from "express";
import { UserRequest } from "./userTypes";
import { BookRequest } from "./booksTypes";



export interface Borrow {
    borrow_id: number;
    user_id: number;
    book_id: number;
    copy_id: number;
    librarian_id: number | null;
    borrow_date: string;
    return_date: string;
    status: string;
    created_at: string;
    updated_at: string;
}


export interface BorrowRequest{

    book_id: number;
    user_id:number;

   
  
}

