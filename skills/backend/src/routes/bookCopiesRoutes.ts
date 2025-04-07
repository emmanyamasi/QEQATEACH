import express from 'express'

import { createBook, deleteBook, getBookById, getBooks, updateBooK } from '../controllers/booksController'
import { protect } from '../middlewares/auth/protect'
import { adminGuard, organizerGuard } from '../middlewares/auth/roleMiddleWare'
import { bookOwnerGuard } from '../middlewares/books/booksOwnerGuard'
import { createBookCopy, updateBookCopy } from '../controllers/bookcopiesController'


const router = express.Router()
router.post("/admin", protect, adminGuard, createBookCopy);

router.post("/", protect, organizerGuard, createBookCopy);


//update book librarian

router.patch("/:copy_id", protect, organizerGuard,  updateBookCopy);


export default router;