import express from 'express';
import { createEvent, getEvents } from '../controller/event.Controller.js';
// import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

// Anyone can view events, but only logged-in users can create them
router.route('/').post( createEvent).get(getEvents);

export default router;