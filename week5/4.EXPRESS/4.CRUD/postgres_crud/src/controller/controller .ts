import pool from "../db/config"

import express, { Request, Response, NextFunction, response } from "express"
import dotenv from 'dotenv'
import { log } from "console"
import { readFileSync } from "fs"
import path from "path"
import cors from "cors"


const  postEventController =async (req: Request, res: Response) => {
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

}

export  default postEventController