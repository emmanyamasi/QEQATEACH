

import express from "express"
//dotenv
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from "cors"


dotenv.config()





//express instance

const app = express()

//load variables -dont forget

app.use(express.json()); //for parsing json data
app.use(express.urlencoded({ extended: true }))//parsing form data



//enable middlewares
app.use(cookieParser());//import it and install it
app.use(cors({ //import and install
    origin: "http://localhost:5173",  // 
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));


//create routes


app.get("/api/v1/test",(req,res)=>{
    res.send("works")
})



//load more middlewares

//start the server



const port = process.env.PORT
console.log(port)

app.listen(port, () => {
    console.log(`server is running on port :${port}`)
})

