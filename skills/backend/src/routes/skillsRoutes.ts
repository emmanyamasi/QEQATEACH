import express from 'express';
import { getSkills } from '../controllers/skillsController'; // Import the controller function

const router = express.Router();

// Define route for fetching skills
router.get('/skills', getSkills);

export default router;
