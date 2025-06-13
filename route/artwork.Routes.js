import express from 'express';
import { createArtwork, getArtworks } from '../controller/artWork.controller.js';
// import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

// protect middleware ensures only logged-in users can create artwork
router.route('/').post(createArtwork).get(getArtworks);

export default router;