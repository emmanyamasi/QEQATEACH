import express from 'express';
import { protect } from '../middlewares/auth/protect'; // Authentication middleware
import { saveJobSeekerProfile } from '../controllers/jobSeekerController';

const router = express.Router();

// POST request to save jobseeker profile
router.post('/jobseeker-profile', protect, saveJobSeekerProfile );

export default router;
