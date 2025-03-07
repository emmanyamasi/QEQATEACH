import express, { Request, Response, NextFunction } from "express"
import dotenv from 'dotenv'
import { log } from "console"
import { readFileSync } from "fs"
import path from "path"
import cors from "cors"
import { events } from "./db/events"

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

app.get('/', (req, res) => {
    res.send(`hey you`)
})



//get the directory

const _dirname = path.resolve()

const eventData = readFileSync(
    path.join(_dirname, "src", "db", "eventsData.json"), "utf-8"

)



app.get('/api/events', (req, res) => {
    res.send(events)
})

app.get('/api/events/:id', (req: Request, res: Response) => {
    try {
        const eventId = Number(req.params.id);
        if (isNaN(eventId)) {
            res.status(400).json({ message: "invalid event id" });
            return;
        }
        const event = events.find((eventObj) => eventObj.id === eventId);
        if (!event) {
            res.status(404).json({ message: "event not found" });
            return;

        }
        res.json(event);



    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" });

    }

});





//handling  multiple route parameters
//wecan combine multiple  route  parameters in one  request
//http://localhost:3000/api/events/art/1
app.get('/api/events/:category/:id', (req: Request, res: Response) => {
    const { category, id } = req.params
    res.send(`Category: ${category}, Event id:${id}`)
})






//optional route params
//route params can be optional by adding? afetr the parameter name
app.get("/api/events/:id?", (req: Request, res: Response) => {
    const eventId = req.params.id;
    if (!eventId) {
        try {
            //ensure req.params.id is a valid number
            const eventId = Number(req.params.id);
            if (isNaN(eventId)) {
                res.status(400).json({ message: "invalid EVENT ID" });
                return; //explicit return  to stop futher execution
            }

            const event = events.find((eventObj) => eventObj.id === eventId);
            if (!event) {
                res.status(404).json({ message: "event not found" });
                return;

            }
            res.json(event);


        } catch (error) {
            console.error(error)
            res.status(500).json({ message: "internal serevr error" });

        }
    } else {
        res.send(events)

    }
});


//create a server
app.listen(port, () => {
    console.log(`server is running on port :${port}`)
})


