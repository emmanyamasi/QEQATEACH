import { Request, Response } from 'express';
import pool from '../config/db.config';
import { UserRequest } from '../utils/types/userTypes';

// Save Jobseeker Profile
export const saveJobSeekerProfile = async (req: UserRequest, res: Response) => {
    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized: No user found' });
        return
      }
    
      const { name, phone, location, portfolio_link, skills } = req.body;
    
      const userId = req.user.id; // req.user is now known to be defined
    

  try {
    // Start a transaction for multiple operations
    await pool.query('BEGIN');

    // 1. Save profile data in jobseeker_profiles table
    const profileQuery = `
      INSERT INTO jobseeker_profiles (user_id, phone, location, portfolio_link)
      VALUES ($1, $2, $3, $4)
      RETURNING profile_id`;
    const result = await pool.query(profileQuery, [
      userId,
      phone,
      location,
      portfolio_link,
    ]);
    const profileId = result.rows[0].profile_id;

    // 2. Save skills in the jobseeker_skills table (many-to-many relationship)
    const skillInsertQueries = skills.map((skill: any) => {
      return pool.query(
        `INSERT INTO jobseeker_skills (profile_id, skill_id, skill_level, years_of_experience)
         VALUES ($1, $2, $3, $4)`,
        [profileId, skill.skill_id, skill.skill_level, skill.years_of_experience]
      );
    });

    // Execute all skill insertion queries concurrently
    await Promise.all(skillInsertQueries);

    // Commit transaction
    await pool.query('COMMIT');

    res.status(201).json({
      message: 'Jobseeker profile saved successfully!',
      profileId,
    });
  } catch (error) {
    // Rollback the transaction
    await pool.query('ROLLBACK');
  
    // Narrow the error type
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({ message: 'Error saving profile', error: error.message });
    } else {
      console.error('Unknown error:', error);
      res.status(500).json({ message: 'Unknown error occurred' });
    }
}}
