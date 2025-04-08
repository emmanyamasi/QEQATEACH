import express from 'express';
import { getSkillCategories } from '../controllers/skillCategories';
// Import the controller function

const router = express.Router();

// Define route for fetching skill categories
router.get('/skill-categories', getSkillCategories);

export default router;
