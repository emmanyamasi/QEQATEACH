import express, { Request, Response, NextFunction, response } from "express"
import dotenv from 'dotenv'
import { log } from "console"
import { readFileSync } from "fs"
import path from "path"
import cors from "cors"

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
// const _dirname = path.resolve()
// const eventData = readFileSync(
//     path.join(_dirname, "src", "db", "eventsData.json"), "utf-8"
// )



//enable cors with options(RECOMMENDED)
app.use(cors({
    origin: "http://localhost:5173",  // 
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true
}));




//a simmple get request saying hey you

app.get('/', (req, res) => {
    res.send(`hey you`)
})

//reading an external thing ie database,cloud need time to connect to them  so making them asynchronous will help
app.post('/api/v1/users', async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // Check if email is unique
        const emailCheck = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
        if (emailCheck.rows.length > 0) {
            res.status(400).json({ message: "User already exists" });
            return
        }

        // Insert new user
        const userResult = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, password]
        );

        res.status(201).json({
            message: "User successfully created",
            user: userResult.rows[0]
        });

    } catch (error) {
        console.error("ERROR CREATING USER", error);
        res.status(500).json({ message: "Internal server error" });
    }
});




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
app.post('/api/v1/books', async (req: Request, res: Response) => {
    try {
        const { title, author, genre, year, pages, publisher, description, image, price, user_id } = req.body;
        //check if user exists


        const userCheck = await pool.query("SELECT id FROM users WHERE id = $1", [user_id]);
        //if user does  not exist
        if (userCheck.rows.length === 0) {
            res.status(400).json({ message: "user not found" })
            return

        } const booksResult = await pool.query(`INSERT INTO books(title,author,genre,year,pages,publisher,description,image,price,user_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)RETURNING *`, [title, author, genre, year, pages, publisher, description, image, price, user_id]);
        res.status(201).json({
            message: "Event created succesfully",
            books: booksResult.rows[0]
        });

    } catch (error) {
        console.error("ERROR CREATING event", error)
        res.status(500).json({ message: "Internal server error" });


    }


})


///get all
app.get('/api/v1/books', async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM public.books ORDER BY id ASC")
        res.status(200).json(result.rows)


    } catch (error) {

        console.error("ERROR gettin event", error)
        res.status(500).json({ message: "Internal server error" });

    }
})

//get one event
app.get('/api/v1/books/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await pool.query("SELECT * FROM public.books WHERE id=$1", [id])
        if (result.rows.length === 0) {
            res.status(400).json({ message: "event not found" })
            return

        }
        res.status(200).json(result.rows[0])

    } catch (error) {

        console.error("ERROR gettin event", error)
        res.status(500).json({ message: "Internal server error" });


    }
})


//update event

app.put('/api/v1/books/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, author, genre, year, pages, publisher, description, image, price, user_id } = req.body;

        // Check if the book exists
        const checkBook = await pool.query("SELECT * FROM public.books WHERE id = $1", [id]);
        if (checkBook.rows.length === 0) {
          res.status(404).json({ message: "Book not found" });
          return
        }

        // Update book details
        const result = await pool.query(
            `UPDATE public.books
            SET title = $1, 
                author = $2, 
                genre = $3, 
                year = $4, 
                pages = $5, 
                publisher = $6, 
                description = $7, 
                image = $8, 
                price = $9, 
                user_id = $10,
                updated_at = NOW()
            WHERE id = $11 
            RETURNING *`,
            [title, author, genre, year, pages, publisher, description, image, price, user_id, id]
        );

        res.json({ message: "Book updated successfully", book: result.rows[0] });

    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});




app.patch('/api/v1/books/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { title, author, genre, year, pages, publisher, description, image, price, user_id } = req.body
        const checkEvent = await pool.query("SELECT * FROM public.books WHERE id= $1", [id])
        if (checkEvent.rows.length === 0) {
            res.status(400).json({ message: "not found" })
            return
        }
        const result = await pool.query(
            `UPDATE books
            SET title = COALESCE($1, title),
                genre = COALESCE($2, genre),
                year = COALESCE($3, year),
                publisher = COALESCE($4, publisher),
                pages = COALESCE($5, pages),
                description = COALESCE($6, description),
                image = COALESCE($7, image),
                price = COALESCE($8, price),
                author = COALESCE($9, author),
                user_id = COALESCE($10, user_id),
                updated_at = NOW()
            WHERE id = $11 RETURNING*`,
            [title || null,  genre || null, year || null,publisher || null, pages || null,  description || null, image || null, price || null,author || null, user_id ||null, id]);
        res.json({ message: "event updated", event: result.rows[0] });


    } catch (error) {

        console.error("ERROR gettinguser ", error)
        res.status(500).json({ message: "Internal server error" });

    }


})







//delete a book by id
app.delete("/api/v1/books/:id", async (req: Request, res: Response) => {
    try {

        const { id } = req.params
        const checkEvent = await pool.query("SELECT * FROM public.books WHERE id = $1", [id])
        if (checkEvent.rows.length === 0) {
            res.status(404).json({ message: "not found" });
            return
        }
        await pool.query("DELETE FROM public.books WHERE id = $1", [id]);
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


