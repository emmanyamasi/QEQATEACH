import express, { Request, Response, NextFunction, response } from "express"
import dotenv from 'dotenv'
import { log } from "console"
import { readFileSync } from "fs"
import path from "path"
import cors from "cors"
import { events } from "./db/events"
//import { Pool } from "./db/db"

//comfigure the dotenv
dotenv.config()


//instance
const app = express()
app.use(express.json());

//load the variables
const port = process.env.PORT
console.log(port)

//enable CORS FOR ALL ORIGINS
//app.use(cors())


//enable cors with options(RECOMMENDED)
app.use(cors({
    origin: "http://localhost:5173",  // 
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));




//a simmple get request saying hey you

app.get('/', (req, res) => {
    res.send(`hey you`)
})


// app.post('/api/v1/users',async(req:Request,res:Response)=>{
//     try {
//         const {name,email,password}=req.body
//         //check if email is unique
//         const emailCheck = await pool.query("SELECT id from users WHERE email = $1",[email])
//         if(emailCheck.rows.length>0){
//             res.status(400).json({message:"user already exists"})
//             return
//         }
//         //new user
//         const userResult = await pool.query( "INSERT INTO users (name,email,password) VALUES($1,$2,$3) RETURNING *",

//         )
        
//     } catch (error) {
        
//     }

// })







//create a server
app.listen(port, () => {
    console.log(`server is running on port :${port}`)
})


