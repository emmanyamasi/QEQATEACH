import express, { Request, Response, NextFunction } from "express"
import dotenv from 'dotenv'
import { log } from "console"
import { readFileSync } from "fs"
import path from "path"
import cors from "cors"
import { events } from "./db/events"
import { UserData } from "./db/userData"

//comfigure the dotenv
dotenv.config()


//instance
const app = express()

//load the variables
const port = process.env.PORT
console.log(port)


//enable midddlwares

//1.enable CORS FOR ALL ORIGINS
//app.use(cors())

//2.json
app.use(express.json())
app.use(express.urlencoded({ extended: true }));






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




//lets create a new event
//post
//when sending data using post,put,pacth they need to be sent as json format-this means we will need to add middlewware to help with that
//middlwares-

app.post('/api/v1/users', (req: Request, res: Response) => {
    const { body } = req
    ///if  the user data is  empty  the id  will be one  else wil add 1 to the last id in the length
    const newId = UserData.length > 0 ? UserData[UserData.length - 1].userID + 1 : 1
    //pushthe objectdata to the userObject
    const newData = { id: newId, ...body }
    UserData.push(newData)

    res.status(201).json({
        message: "successfully posted",
        payload: newData
    })


})


app.get("/api/v1/users/:id?", (req: Request, res: Response) => {
    const userId = req.params.id;
    if (userId) {
        try {
            // Ensure req.params.id is a valid number
            // const {eventId}  = req.params
            // const parsedNumber = Number(eventId)
            const userId = Number(req.params.id);
            if (isNaN(userId)) {
                res.status(400).json({ message: "Invalid user ID" });
                return; // Explicit return to stop further execution
            }

            // Find the user in the dataset
            const user = UserData.find((UserObj) => UserObj.userID === userId);

            if (!user) {
                res.status(404).json({ message: "User not found" });
                return; // Explicit return to stop further execution
            }

            // Return the event if found
            res.json(user);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    } else {
        //"Fetching all events"
        res.send(UserData)
    }
});

//put
app.put('api/v1/users/:id', (req: Request, res: Response) => {
    const userId = Number(req.params.id)
    const { userName, displayName } = req.body
    //validate the input
    if (isNaN(userId)) {
        res.status(400).json({ message: "invalid id" })
        return

    }
    //get user index
    const userIndex = UserData.findIndex((user) => user.userID === userId)
    //if the user index is unavailable
    if (userIndex === -1) {
        res.status(404).json({ message: "user not found" })
        return
    }
    //replace the user at the index with new data
    //while using put put all relevant data even the id

    UserData[userIndex] = { "userID": userId, "userName": userName, "displayName": displayName }
    res.json({ message: "user successfully updated", user: UserData[userIndex] })


})


//patch
app.patch('api/v1/users/:id', (req: Request, res: Response) => {
    const userId = Number(req.params.id)
    const { userName, displayName } = req.body
    //validate the input
    if (isNaN(userId)) {
        res.status(400).json({ message: "invalid id" })
        return

    }
    //get the user in the dataset
    const user = UserData.find((userObj)=>userObj.userID ===userId);
    if(!user){
        res.status(404).json({message:"user not found"});
        return;

    }
    if(userName) user.userName =userName
    if(displayName) user.displayName = displayName
    res.json({message: "user partially updated",user})

}
)



//delete
app.delete('api/v1/users/:id', (req: Request, res: Response) => {
    const userId = Number(req.params.id)

    //validate the input
    if (isNaN(userId)) {
        res.status(400).json({ message: "invalid id" })
        return

    }
    //get user index
    const userIndex = UserData.findIndex((user) => user.userID === userId)
    //if the user index is unavailable
    if (userIndex === -1) {
        res.status(404).json({ message: "user not found" })
        return
    }
    //delete


    UserData.splice(userIndex, 1)
    res.json({ message: `user with userID ${userId} successfully deleted` })


})

//create a server
app.listen(port, () => {
    console.log(`server is running on port :${port}`)
})


