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






