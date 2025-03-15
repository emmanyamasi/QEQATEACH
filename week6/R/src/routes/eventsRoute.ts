import express from 'express'
import { createEvent, deleteEvent, getEventById, getEvents, updateEvent } from '../controllers/eventsController'
import { protect } from '../middlewares/auth/protect'
import { adminGuard, organizerGuard } from '../middlewares/auth/roleMiddleWare'
import { eventOwnerGuard } from '../middlewares/events/eventsOwnerGuard'


const router = express.Router()

/* ==============================
   🚀 Public Routes (Anyone Can Access)
   ============================== */
// View all events
router.get("/", getEvents);

// View a single event by ID
router.get("/:id", getEventById);


/* ==============================
   🔐 Organizer Routes (Protected)
   ============================== */
// Only authenticated organizers can create events
router.post("/", protect, organizerGuard, createEvent);

// Only the event owner (organizer) can update their own event
router.put("/:id", protect, organizerGuard, eventOwnerGuard, updateEvent);

// Only the event owner (organizer) can delete their own event
router.delete("/:id", protect, organizerGuard, eventOwnerGuard, deleteEvent);


/* ==============================
   👑 Admin Routes (Protected)
   ============================== */
// Admins can create events
router.post("/admin", protect, adminGuard, createEvent);

// Admins can update any event
router.put("/:id/admin", protect, adminGuard, updateEvent);

// Admins can delete any event
router.delete("/:id/admin", protect, adminGuard, deleteEvent);


export default router;