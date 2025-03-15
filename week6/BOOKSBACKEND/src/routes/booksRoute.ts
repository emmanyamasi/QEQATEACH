import express from 'express'

import { createBook, deleteBook, getBookById, getBooks, updateBooK } from '../controllers/booksController'
import { protect } from '../middlewares/auth/protect'
import { adminGuard, organizerGuard } from '../middlewares/auth/roleMiddleWare'
import { bookOwnerGuard } from '../middlewares/books/booksOwnerGuard'


const router = express.Router()

/* ==============================
   🚀 Public Routes (Anyone Can Access)
   ============================== */
// View all books
router.get("/", getBooks);

// View a single event by ID
router.get("/:id", getBookById);


/* ==============================
   🔐 Organizer Routes (Protected)
   ============================== */
// Only authenticated organizers can create books
router.post("/", protect, organizerGuard, createBook);

// Only the LIBRARIAN (organizer) can update their own event
router.put("/:id", protect, organizerGuard, bookOwnerGuard, updateBooK);

// Only the LIBRARIAN can delete their own BOOK
router.delete("/:id", protect, organizerGuard, bookOwnerGuard, deleteBook);


/* ==============================
   👑 Admin Routes (Protected)
   ============================== */
// Admins can create events
router.post("/admin", protect, adminGuard, createBook);

// Admins can update any event
router.put("/:id/admin", protect, adminGuard, updateBooK);

// Admins can delete any event
router.delete("/:id/admin", protect, adminGuard, deleteBook);


export default router;