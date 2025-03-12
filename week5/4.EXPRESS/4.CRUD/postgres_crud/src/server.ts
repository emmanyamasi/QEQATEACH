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





//get all users
app.get('/api/v1/users', async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM public.users ORDER BY  id ASC ")
        res.status(200).json(result.rows)

    } catch (error) {

        console.error("ERROR getting user", error)
        res.status(500).json({ message: "Internal server error" });

    }
})



//get single users
app.get('/api/v1/users/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await pool.query("SELECT * FROM public.users WHERE id =$1", [id])
        if (result.rows.length === 0) {
            res.status(400).json({ message: "user not found" })
            return
        }

        res.status(200).json(result.rows[0])


    } catch (error) {

        console.error("ERROR gettinguser ", error)
        res.status(500).json({ message: "Internal server error" });

    }
})



//update user

app.put('/api/v1/users/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, email, password } = req.body
        const checkUser = await pool.query("SELECT * FROM public.users WHERE id =$1", [id])
        if (checkUser.rows.length === 0) {
            res.status(400).json({ message: "user not found" })
            return
        }

        const result = await pool.query("UPDATE users  SET name =$1,email=$2,password=$3,updated_at=NOW() WHERE id=$4 RETURNING *", [name, email, password, id]);
        res.json({ message: "User updated", user: result.rows[0] });





    } catch (error) {

        console.error("ERROR gettinguser ", error)
        res.status(500).json({ message: "Internal server error" });

    }
})







app.delete('/api/v1/users/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params


        const checkUser = await pool.query("SELECT * FROM public.users WHERE id =$1", [id])
        if (checkUser.rows.length === 0) {
            res.status(400).json({ message: "user not found" })
            return
        }
        await pool.query("DELETE FROM  public.users WHERE id = $1", [id]);
        res.json({ message: "user deleted successfully" });




    } catch (error) {

        console.error("ERROR gettinguser ", error)
        res.status(500).json({ message: "Internal server error" });

    }
})







///createan event
app.post('/api/v1/events', async (req: Request, res: Response) => {
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
app.get('/api/v1/events', async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM public.events ORDER BY id ASC")
        res.status(200).json(result.rows) //all rows


    } catch (error) {

        console.error("ERROR gettin event", error)
        res.status(500).json({ message: "Internal server error" });

    }
})

//get one event
app.get('/api/v1/events/:id', async (req: Request, res: Response) => {
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
app.put('/api/v1/events/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { title, location, date, price, user_id } = req.body //before updating check if available

        const checkEvent = await pool.query("SELECT * FROM public.events WHERE id= $1", [id])
        if (checkEvent.rows.length === 0) {
            res.status(400).json({ message: "not found" })
            return
        }
        const result = await pool.query(
            "UPDATE events SET title = $1, location= $2, date =$3, price= $4,user_id =$5,updated_at =NOW() WHERE id=$6 RETURNING *", [title, location, date, price,user_id,id]);
        res.json({ message: "event updated", event: result.rows[0] });


    } catch (error) {

        console.error("ERROR gettinguser ", error)
        res.status(500).json({ message: "Internal server error" });

    }


})


//delete event
app.delete("/api/v1/events/:id", async (req: Request, res: Response) => {
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




//create a server
app.listen(port, () => {
    console.log(`server is running on port :${port}`)
})


