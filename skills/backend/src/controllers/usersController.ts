//ensures admin manages users -CRUD
//RETUN SAFE USERS DETAAILS
import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import pool from "../config/db.config";

//only admins can get users
export const getUsers = asyncHandler(async (req: Request, res: Response) => {

        const result = await pool.query("SELECT * FROM public.users ORDER BY  id ASC ")
        res.status(200).json(result.rows)




})