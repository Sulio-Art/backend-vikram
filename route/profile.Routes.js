import express from 'express';
import { updateProfile, getProfile } from '../controller/profile.Controller.js';
// import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();


router.route('/:id').put(updateProfile).get(getProfile);

export default router;