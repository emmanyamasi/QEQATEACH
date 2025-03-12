///createan event


import { Request, Response } from "express"
import pool from "../db/config"
import asyncHandler from "../middlewares/asyncHandler"

export const createEvent = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { title, location, date, price, user_id } = req.body;
        //check if user exists

        const userCheck = await pool.query("SELECT id FROM users WHERE id = $1", [user_id]);
        //if user does  not exist
        if (userCheck.rows.length === 0) {
            res.status(400).json({ message: "user not found" })
            return

        } const eventResult = await pool.query(`INSERT INTO events(title,location,date,price,user_id) VALUES($1,$2,$3,$4,$5)RETURNING *`, [title, location, date, price, user_id]);
        res.status(201).json({
            message: "Event created succesfully",
            event: eventResult.rows[0]
        });

    } catch (error) {
        console.error("ERROR CREATING event", error)
        res.status(500).json({ message: "Internal server error" });


    }


})


///get all
export const getEvent = asyncHandler(async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM public.events ORDER BY id ASC")
        res.status(200).json(result.rows) //all rows


    } catch (error) {

        console.error("ERROR gettin event", error)
        res.status(500).json({ message: "Internal server error" });

    }
})

//get one event
export const getOneEvent = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await pool.query("SELECT * FROM public.events WHERE id=$1", [id])
        if (result.rows.length === 0) {
            res.status(404).json({ message: "event not found" })
            return

        }
        res.status(200).json(result.rows[0])

    } catch (error) {

        console.error("ERROR gettin event", error)
        res.status(500).json({ message: "Internal server error" });


    }
})


//update event with put  you should update everything
export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { title, location, date, price, user_id } = req.body //before updating check if available

        const checkEvent = await pool.query("SELECT * FROM public.events WHERE id= $1", [id])
        if (checkEvent.rows.length === 0) {
            res.status(400).json({ message: "not found" })
            return
        }
        const result = await pool.query(
            "UPDATE events SET title = $1, location= $2, date =$3, price= $4,user_id =$5,updated_at =NOW() WHERE id=$6 RETURNING *", [title, location, date, price, user_id, id]);
        res.json({ message: "event updated", event: result.rows[0] });


    } catch (error) {

        console.error("ERROR gettinguser ", error)
        res.status(500).json({ message: "Internal server error" });

    }


})


//delete event
export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
    try {

        const { id } = req.params
        const checkEvent = await pool.query("SELECT * FROM public.events WHERE id = $1", [id])
        if (checkEvent.rows.length === 0) {
            res.status(404).json({ message: "not found" });
            return
        }
        await pool.query("DELETE FROM public.events WHERE id = $1", [id]);
        res.json({ message: "event deleted" });
    } catch (error) {

        console.error("ERRO deleting r ", error)
        res.status(500).json({ message: "Internal server error" });

    }
})
