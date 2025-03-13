//handles user related operations
//reading an external thing ie database,cloud need time to connect to them  so making them asynchronous will help
import { Request, Response } from "express"
import pool from "../db/config"
import asyncHandler from "../middlewares/asyncHandler"
export const createUser = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { name, email, password, role_id } = req.body
        //check if email is unique
        const emailCheck = await pool.query("SELECT user_id from users WHERE email = $1", [email])
        if (emailCheck.rows.length > 0) {
            res.status(400).json({ message: "user already exists" })
            return
        }    //new user
        const userResult = await pool.query("INSERT INTO users (name,email,password,role_id) VALUES($1,$2,$3,$4) RETURNING *",
            [name, email, password, role_id])
        res.status(201).json({
            message: "user successfully unserted",
            user: userResult.rows[0]
        })


    } catch (error) {
        console.error("ERROR CREATING USER", error)
        res.status(500).json({ message: "Internal server error" });


    }

})





//get all users
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM public.users ORDER BY  user_id ASC ")
        res.status(200).json(result.rows)

    } catch (error) {

        console.error("ERROR getting user", error)
        res.status(500).json({ message: "Internal server error" });

    }
})



//get single users
export const getOneUser = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params
        const result = await pool.query("SELECT * FROM public.users WHERE user_id =$1", [user_id])
        if (result.rows.length === 0) {
            res.status(400).json({ message: "user not found" })
            return
        }

        res.status(200).json(result.rows[0])


    } catch (error) {

        console.error("ERROR gettinguser ", error)
        res.status(500).json({ message: "Internal server error" });

    }
})



//update user

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params
        const { name, email, password, role_id } = req.body
        const checkUser = await pool.query("SELECT * FROM public.users WHERE user_id =$1", [user_id])
        if (checkUser.rows.length === 0) {
            res.status(400).json({ message: "user not found" })
            return
        }

        const result = await pool.query("UPDATE users  SET name =$1,email=$2,password=$3,role_id =$4,updated_at=NOW() WHERE user_id=$5 RETURNING *", [name, email, password, role_id,user_id]);
        res.json({ message: "User updated", user: result.rows[0] });





    } catch (error) {

        console.error("ERROR gettinguser ", error)
        res.status(500).json({ message: "Internal server error" });

    }
})







export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params


        const checkUser = await pool.query("SELECT * FROM public.users WHERE user_id =$1", [user_id])
        if (checkUser.rows.length === 0) {
            res.status(400).json({ message: "user not found" })
            return
        }
        await pool.query("DELETE FROM  public.users WHERE user_id = $1", [user_id]);
        res.json({ message: "user deleted successfully" });




    } catch (error) {

        console.error("ERROR gettinguser ", error)
        res.status(500).json({ message: "Internal server error" });

    }
})



