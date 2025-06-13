import express from 'express';
import { updateSettings, getSettings } from '../controller/setting.Controller.js';
// import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();


// router.route('/').put(protect, updateSettings).get(protect, getSettings);
router.route('/').put(updateSettings).get(getSettings);

export default router;