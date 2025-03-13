import express, { Request, Response, NextFunction, response } from "express"
import dotenv from 'dotenv'
import { log } from "console"
import { readFileSync } from "fs"
import path from "path"
import cors from "cors"
//import { events } from "./db/events"
import pool from "./db/config";
import usersRoutes from "./routes/usersRoute"
import eventRoutes from "./routes/eventsRoute"
import { notFound } from "./middlewares/errorMiddlewares"

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




//enable cors with options(RECOMMENDED)
app.use(cors({
    origin: "http://localhost:5173",  // 
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));



// const _dirname = path.resolve()
// const eventData = readFileSync(
//     path.join(_dirname, "src", "db", "eventsData.json"), "utf-8"
// )



//create the routes
app.use("/api/v1/users",usersRoutes)
app.use("/api/v1/events",eventRoutes)


//middlewares after routes
app.use(notFound)

//create a server
app.listen(port, () => {
    console.log(`server is running on port :${port}`)
})


