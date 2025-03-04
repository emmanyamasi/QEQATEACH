import express from "express"
import dotenv from 'dotenv'
import { log } from "console"
import { readFileSync } from "fs"
import path from "path"
import cors from  "cors"

//comfigure the dotenv
dotenv.config()


//instance
const app = express()

//load the variables
const port = process.env.PORT
console.log(port)

//enable CORS FOR ALL ORIGINS
//app.use(cors())


//enable cors with options(RECOMMENDED)
app.use(cors({
    origin : "urlserver-domain",
    methods:"GET,PUT,DELETE",
    credentials :true //allows cookies and auth



}))



//a simmple get request saying hey you

app.get('/', (req,res)=>{
    res.send(`hey you`)
})



//get the directory

const _dirname = path.resolve()


//synchronously  read the file
const eventData = readFileSync(
    path.join(_dirname, "src","db","db.json"), "utf-8"
)

//console.log(eventData)


app.get('/events', (req,res)=>{
    res.send(eventData)
})



//create a server
app.listen(port,()=>{
    console.log(`server is running on port :${port}`)
})


