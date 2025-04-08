import { Response } from "express";
import pool from "../config/db.config";
import { UserRequest } from "../utils/types/userTypes";
import asyncHandler from "../middlewares/asyncHandler";


// 🔹 GET USER PROFILE
export const getUserProfile = asyncHandler(async (req: UserRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const userId = req.user.id;

  const result = await pool.query(
    `SELECT u.id, u.name, u.email, u.role_id, ur.role_name
     FROM users u
     JOIN user_roles ur ON u.role_id = ur.id
     WHERE u.id = $1`,
    [userId]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  const user = result.rows[0];

  res.status(200).json({
    user,
  });
});






// 🔸 PUT /api/profile - Update user profile
export const updateUserProfile = asyncHandler(async (req: UserRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const userId = req.user.id;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and Email are required" });
  }

  // Optional: check if email is already used by another user
  const emailExists = await pool.query(
    "SELECT id FROM users WHERE email = $1 AND id != $2",
    [email, userId]
  );

  if (emailExists.rows.length > 0) {
    return res.status(400).json({ message: "Email already in use by another account" });
  }

  // Update the user info
  const updated = await pool.query(
    `UPDATE users
     SET name = $1, email = $2, updated_at = NOW()
     WHERE id = $3
     RETURNING id, name, email, role_id`,
    [name, email, userId]
  );

  res.status(200).json({ user: updated.rows[0], message: "Profile updated successfully" });
});



