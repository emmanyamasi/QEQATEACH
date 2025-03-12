//handles user related operations
//reading an external thing ie database,cloud need time to connect to them  so making them asynchronous will help
import { Request,Response } from "express"
import pool from "../db/config"
import asyncHandler from "../middlewares/asyncHandler"
export const createUser =  asyncHandler(async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body
        //check if email is unique
        const emailCheck = await pool.query("SELECT id from users WHERE email = $1", [email])
        if (emailCheck.rows.length > 0) {
            res.status(400).json({ message: "user already exists" })
            return
        }    //new user
        const userResult = await pool.query("INSERT INTO users (name,email,password) VALUES($1,$2,$3) RETURNING *",
            [name, email, password])
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
export const getUsers = asyncHandler( async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM public.users ORDER BY  id ASC ")
        res.status(200).json(result.rows)

    } catch (error) {

        console.error("ERROR getting user", error)
        res.status(500).json({ message: "Internal server error" });

    }
})



//get single users
export const getOneUser=   asyncHandler(async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await pool.query("SELECT * FROM public.users WHERE id =$1", [id])
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

export const updateUser =  asyncHandler(async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, email, password } = req.body
        const checkUser = await pool.query("SELECT * FROM public.users WHERE id =$1", [id])
        if (checkUser.rows.length === 0) {
            res.status(400).json({ message: "user not found" })
            return
        }

        const result = await pool.query("UPDATE users  SET name =$1,email=$2,password=$3,updated_at=NOW() WHERE id=$4 RETURNING *", [name, email, password, id]);
        res.json({ message: "User updated", user: result.rows[0] });





    } catch (error) {

        console.error("ERROR gettinguser ", error)
        res.status(500).json({ message: "Internal server error" });

    }
})







export const deleteUser =  asyncHandler(async (req: Request, res: Response) => {
    try {
        const { id } = req.params


        const checkUser = await pool.query("SELECT * FROM public.users WHERE id =$1", [id])
        if (checkUser.rows.length === 0) {
            res.status(400).json({ message: "user not found" })
            return
        }
        await pool.query("DELETE FROM  public.users WHERE id = $1", [id]);
        res.json({ message: "user deleted successfully" });




    } catch (error) {

        console.error("ERROR gettinguser ", error)
        res.status(500).json({ message: "Internal server error" });

    }
})



