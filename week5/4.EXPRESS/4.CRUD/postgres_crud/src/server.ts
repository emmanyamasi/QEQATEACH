import express, { Request, Response, NextFunction, response } from "express"
import dotenv from 'dotenv'
import { log } from "console"
import { readFileSync } from "fs"
import path from "path"
import cors from "cors"
import { events } from "./db/events"
import pool from "./db/config";


//comfigure the dotenv
dotenv.config()


//instance
const app = express()


//load the variables
const port = process.env.PORT
console.log(port)

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//enable CORS FOR ALL ORIGINS
//app.use(cors())
const _dirname = path.resolve()
const eventData = readFileSync(
    path.join(_dirname, "src", "db", "eventsData.json"), "utf-8"
)



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

//reading an external thing ie database,cloud need time to connect to them  so making them asynchronous will help
app.post('/api/v1/users', async (req: Request, res: Response) => {
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


///createan event
app.post('/api/v1/events', async (req: Request, res: Response) => {
    try {
        const {title,location,date,price,user_id}=req.body;
        //check if user exists
        const userCheck = await pool.query("SELECT id FROM users WHERE id = $1",[user_id])

        //if user does  not exist
        if (userCheck.rows.length ===0){
            res.status(400).json({message:"user not found"})
            return

        }
        const eventResult =await pool.query("INSERT INTO events")
        
    } catch (error) {
        console.error("ERROR CREATING event", error)
        res.status(500).json({ message: "Internal server error" });

        
    }


})







//create a server
app.listen(port, () => {
    console.log(`server is running on port :${port}`)
})


