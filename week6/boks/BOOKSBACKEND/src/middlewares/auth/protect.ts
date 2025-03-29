import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import pool from "../../config/db.config";
import { UserRequest } from "../../utils/types/userTypes";
import asyncHandler from "../asyncHandler";

// Auth middleware to protect routes
export const protect = asyncHandler(async (req: UserRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;
    console.log("Request Headers:", req.headers);
    console.log("Request Cookies:", req.cookies);

    // 1️⃣ Extract Token from Authorization Header or Cookies
    if (req.headers.authorization?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.access_token) {
        token = req.cookies.access_token;
    }

    // 2️⃣ If No Token, Send Error Response
    if (!token || token.trim() === "") {
        console.log("No token found in request");
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        // 3️⃣ Ensure JWT_SECRET is Set
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        console.log("Token before verification:", token);

        // 4️⃣ Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string | number; roleId: number };

        console.log("Decoded Token:", decoded);

        // 5️⃣ Convert userId to Number Only If Needed
        const userId = typeof decoded.userId === "string" ? parseInt(decoded.userId, 10) : decoded.userId;
        if (isNaN(userId)) {
            return res.status(400).json({ message: "Invalid ID in token" });
        }

        // 6️⃣ Fetch User from Database
        const userQuery = await pool.query(
            `SELECT users.id, users.name, users.email, users.role_id, user_roles.role_name 
             FROM users 
             JOIN user_roles ON users.role_id = user_roles.id 
             WHERE users.id = $1`,
            [userId]
        );

        if (userQuery.rows.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }

        // 7️⃣ Attach User to Request and Proceed
        req.user = userQuery.rows[0];
        next();
    } catch (error) {
        console.error("JWT Error:", error);
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
});
