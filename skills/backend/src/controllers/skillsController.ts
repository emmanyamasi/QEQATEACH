import { Request, Response } from 'express';
import pool from '../config/db.config';  // Import the pool from your config

// Controller function to get skill categories
export const getSkills = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT skill_id, skill_name,  category_id FROM skills');
        res.status(200).json(result.rows);  // Send the result as a JSON response
    } // In your catch block, assert the error as an instance of Error
    catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);  // Accessing message property safely
            res.status(500).json({ message: 'Error fetching skills', error: error.message });
        } else {
            console.error('Unknown error:', error);
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
}
