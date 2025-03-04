import express,{Request,Response,NextFunction} from "express"
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
    origin: "http://localhost:5173",  // 
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));




//a simmple get request saying hey you

app.get('/', (req,res)=>{
    res.send(`hey you`)
})



//get the directory

const _dirname = path.resolve()

const eventData = readFileSync(
    path.join(_dirname, "src","db","db.json"), "utf-8"
)


app.get('/api/books',(req:Request,res:Response) =>{
    res.send(eventData)
})

//synchronously  read the file
/**const eventData = readFileSync(
    path.join(_dirname, "src","db","db.json"), "utf-8"
)

//console.log(eventData)


app.get('/api/events', (req,res)=>{
    res.send(eventData)
})

const events = [
    {
        id: 1,
        title: "Tech Conference 2025",
        location: "Nairobi",
        company: "TechCorp",
        price: 5000
    },
    {
        id: 2,
        title: "AI Workshop",
        location: "Mombasa",
        company: "AI Innovators",
        price: 3000
    },
    {
        id: 3,
        title: "Web Development Bootcamp",
        location: "Kisumu",
        company: "CodeAcademy",
        price: 4000
    },
    {
        id: 4,
        title: "Cybersecurity Summit",
        location: "Nairobi",
        company: "CyberSecure Ltd",
        price: 4500
    }
];


//lets create a get api route  that filters  events based on query
app.get('/api/eventsFilter', (req:Request,res:Response)=>{
    try {
        const {title,location, company,price}= req.query
        let filteredEvents = [...events]
        //filtering logic
        if(title){
            filteredEvents = filteredEvents.filter((event) => event.title.toLowerCase().includes((title as string).toLowerCase()))
        }

        if(location){
            filteredEvents = filteredEvents.filter((event) => event.location.toLowerCase().includes((location as string).toLowerCase()))
        }

        if(company){
            filteredEvents = filteredEvents.filter((event) => event.company.toLowerCase().includes((company as string).toLowerCase()))
        }

        if(price){
            const priceNum = parseFloat(price as string)
            filteredEvents = filteredEvents.filter((event) => event.price=== priceNum)
        }
        
    } catch (error) {
        
    }
   
})**/



//create a server
app.listen(port,()=>{
    console.log(`server is running on port :${port}`)
})


