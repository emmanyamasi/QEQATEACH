import express from "express";

import { createEvent, deleteEvent, getEvent, getOneEvent, updateEvent } from "../controllers/booksController";


//instance of router
const router = express.Router()


//routes
router.post("/",createEvent)
router.get("/",getEvent)
router.get("/:id",getOneEvent)
router.put("/:id",updateEvent)
router.delete("/:id",deleteEvent)

export default router