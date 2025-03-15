import { Response } from "express";
import pool from "../config/db.config";
import { UserRequest } from "../utils/types/userTypes";
import asyncHandler from "../middlewares/asyncHandler";
import { BookRequest } from "../utils/types/booksTypes";

/**
 * @desc Create a book
 * @route POST /api/v1/books
 * @access Librarian & Admin Only
 */
export const createBook = asyncHandler(async (req: UserRequest, res: Response) => {
    //Modify the createEvent function inside eventController.ts so that user_id is dynamically obtained from the logged-in user.
    //     ✅ Now, user_id is automatically set from the token instead of being manually provided.
    // ✅ Ensures only Organizer or Admin roles can create events.
    try {
        // Extract user_id from the authenticated user's token
        if (!req.user) {
            res.status(401).json({ message: "Not authorized" });
            return;
        }

        const user_id = req.user.id; // User ID from token
        const { title, author, genre, year, pages, publisher, description, price, total_copies, available_copies } = req.body;

        // Ensure that only an Organizer or the Adim can create an event

        if (req.user.role_name !== "Librarian" && req.user.role_name !== "Admin") {
            res.status(403).json({ message: "Access denied: Only Librarianss or Admins can create events" });
            return;
        }

        // Insert event into the database
        const booksResult = await pool.query(
            `INSERT INTO books ( title, author, genre, year, pages, publisher, description, price, total_copies, available_copies, user_id) 
             VALUES ($1, $2, $3, $4, $5 ,$6,$7,$8,$9,$10,$11) RETURNING *`,
            [title, author, genre, year, pages, publisher, description, price, total_copies, available_copies, user_id]
        );

        res.status(201).json({
            message: "books created successfully",
            event: booksResult.rows[0]
        });

    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// // Get all events (Public - Attendees, Organizers, Admins)
export const getBooks = asyncHandler(async (req: BookRequest, res: Response) => {
    const result = await pool.query("SELECT * FROM books ORDER BY year ASC");
    res.status(200).json(result.rows);
});

// // Get single event by ID (Public - Attendees, Organizers, Admins)
export const getBookById = asyncHandler(async (req: BookRequest, res: Response) => {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM books WHERE id=$1", [id]);

    if (result.rows.length === 0) {
        res.status(404).json({ message: "book not found" });
        return;
    }

    res.status(200).json(result.rows[0]);
});

// // Update book (Only the librarian or Admin)
export const updateBooK = asyncHandler(async (req: BookRequest, res: Response) => {
    const { id } = req.params;
    const { title, author, genre, year, pages, publisher, description, price, total_copies, available_copies } = req.body;

    if (!req.user) {
        res.status(401).json({ message: "Not authorized" });
        return;
    }

    //     // Check if the bookexists
    const bookQuery = await pool.query("SELECT user_id FROM books WHERE id=$1", [id]);

    if (bookQuery.rows.length === 0) {
        res.status(404).json({ message: "book not found" });
        return;
    }

    // Check if the user is the owner or an Admin
    if (req.user.role_name !== "Librarian" && req.user.role_name !== "Admin" && bookQuery.rows[0].user_id !== req.user.id) {
        return res.status(403).json({ message: "Not authorized to update this book" });
    }

    // Update book
    const result = await pool.query(
        `UPDATE books 
         SET title=$1, author=$2, genre=$3, year=$4, pages=$5, publisher=$6, description=$7, price=$8, 
         total_copies=$9, available_copies=$10, updated_at=NOW() 
         WHERE id=$11 RETURNING *`,
        [title, author, genre, year, pages, publisher, description, price, total_copies, available_copies, id]

    );

    res.json({ message: "BOOK updated", book: result.rows[0] });
});

// // Delete event (Only the event owner or Admin)
export const deleteBook = asyncHandler(async (req: BookRequest, res: Response) => {
    const { id } = req.params;

    if (!req.user) {
        return res.status(401).json({ message: "Not authorized" });
    }

    // Check if the book exists and get the owner
    const bookQuery = await pool.query("SELECT user_id FROM books WHERE id=$1", [id]);

    if (bookQuery.rows.length === 0) {
        return res.status(404).json({ message: "Book not found" });
    }

    // Allow Admins, Librarians, or Book Owners to delete
    if (req.user.role_name !== "Librarian" && req.user.role_name !== "Admin" && bookQuery.rows[0].user_id !== req.user.id) {
        return res.status(403).json({ message: "Not authorized to delete this BOOK" });
    }

    // Delete the book
    await pool.query("DELETE FROM books WHERE id=$1", [id]);
    res.json({ message: "Book deleted successfully" });
});
