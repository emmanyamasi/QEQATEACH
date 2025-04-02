// import express from 'express'

// import { createBook, deleteBook, getBookById, getBooks, getLibrarianBooks, updateBooK } from '../controllers/booksController'
// import { protect } from '../middlewares/auth/protect'
// import { adminGuard, organizerGuard } from '../middlewares/auth/roleMiddleWare'
// import { bookOwnerGuard } from '../middlewares/books/booksOwnerGuard'


// const router = express.Router()







// /* ==============================
//    🚀 Public Routes (Anyone Can Access)
//    ============================== */
// // View all books
// router.get("/", getBooks);



// router.get("/librarian", protect, organizerGuard, getLibrarianBooks);


// router.get("/:id", getBookById);





// /* ==============================
//    🔐 Organizer Routes (Protected)
//    ============================== */
// // Only authenticated organizers can create books
// router.post("/librarian", protect, organizerGuard, createBook);

// // Only the LIBRARIAN (organizer) can update their own event
// //router.put("/:id", protect, organizerGuard, bookOwnerGuard, updateBooK);

// // Only the LIBRARIAN can delete their own BOOK
// //router.delete("/:id", protect, organizerGuard, bookOwnerGuard, deleteBook);


// /* ==============================
//    👑 Admin Routes (Protected)
//    ============================== */
// // Admins can create events
// router.post("/admin", protect, adminGuard, createBook);




// // Admins can update any book
// //router.put("/:id/admin", protect, adminGuard, updateBooK);

// // Admins can delete any event
// //router.delete("/:id/admin", protect, adminGuard, deleteBook);

// router.put("/:id", protect, organizerGuard, bookOwnerGuard, updateBooK);
// router.put("/:id/admin", protect, adminGuard, updateBooK);

// router.delete("/:id", protect, organizerGuard, bookOwnerGuard, deleteBook);
// router.delete("/:id/admin", protect, adminGuard, deleteBook);

// export default router;


import express from 'express'
import { createBook, deleteBook, getBookById, getBooks, getLibrarianBooks, updateBooK } from '../controllers/booksController'
import { protect } from '../middlewares/auth/protect'
import { adminGuard, organizerGuard } from '../middlewares/auth/roleMiddleWare'
import { bookOwnerGuard } from '../middlewares/books/booksOwnerGuard'

const router = express.Router()

/* ==============================
   👑 Admin Routes (Protected)
   ============================== */
// Admins can create books
router.post("/admin", protect, adminGuard, createBook);

// Admins can update any book
router.put("/:id/admin", protect, adminGuard, updateBooK);

// Admins can delete any book
router.delete("/:id/admin", protect, adminGuard, deleteBook);


/* ==============================
   🔐 Organizer Routes (Protected)
   ============================== */
// Only authenticated organizers can create books
router.post("/librarian", protect, organizerGuard, createBook);

// Only the LIBRARIAN (organizer) can update their own book
router.put("/:id", protect, organizerGuard, bookOwnerGuard, updateBooK);

// Only the LIBRARIAN can delete their own book
router.delete("/:id", protect, organizerGuard, bookOwnerGuard, deleteBook);


/* ==============================
   🚀 Public Routes (Anyone Can Access)
   ============================== */
// View all books
router.get("/", getBooks);

// Get all books for librarian/organizer
router.get("/librarian", protect, organizerGuard, getLibrarianBooks);

// Get a single book by ID
router.get("/:id", getBookById);

export default router;
