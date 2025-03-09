import express, { Request, Response, NextFunction, response } from "express"
import dotenv from 'dotenv'
import { log } from "console"
import { readFileSync } from "fs"
import path from "path"
import cors from "cors"
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

let books: any[] = []; //initialize the books array as an empty array

try {
    const eventData = readFileSync(path.join(_dirname, "src", "db", "db.json"), "utf-8"); //reads the db.json

    const parsedData = JSON.parse(eventData); //parses the json data  into javascript object

    if (!Array.isArray(parsedData.books)) {
        throw new Error("Invalid book structure"); //checks  if  its is an array

    }

    books = parsedData.books;
} catch (error) {
    console.error("Error loading books:", error);
    books = [];//if any errroor occures  logs it  and assignd  empty array
}







app.get('/api/books', (req: Request, res: Response) => {
    res.json(books)//gets all books
})
app.get('/api/books/filter', (req: Request, res: Response) => {
    try {
        const { genre } = req.query; //extracts  genre from query parameters
        console.log("received genre", genre);

        if (!genre || typeof genre !== "string") { //validats the input if a string
            res.status(400).json({ message: "Genre paramete is required and must be string" });
            return;
        }
        console.log("Books data before filtering:", books);


        const filteredBooks = books.filter((book: any) => book.genre.toLowerCase().includes(genre.toLowerCase()));//uses includes to check  if a books genre  contains  the requested genre
        res.json(filteredBooks); //respondd with filtereed books
        return;
    } catch (error) {
        console.error("Error filtering books:", error);
        res.status(500).json({ message: "Internal server error" });
        return;

    }
});

app.get('/api/books/sortP', (req: Request, res: Response) => {
    try {
        const { pages } = req.query;
        console.log("received order", pages);

        let sortedBooksP = [...books]; //makes acopy preventing  modifying original data
        if (pages === 'asc') {
            sortedBooksP.sort((a, b) => a.pages - b.pages);


        } else if (pages === 'desc') {
            sortedBooksP.sort((a, b) => b.pages - a.pages);

        }
        res.status(200).json(sortedBooksP)
        return;



    } catch (error) {
        console.error("Error in sorting by pages books:", error);
        res.status(500).json({ message: "Internal server error" });
        return;

    }
});


app.get('/api/books/sortY',(req:Request,res:Response)=>{
    try {
        const {year} =req.query;
        console.log("received year",year)
        let sortedBooksY= [...books];
        if(year === 'asc'){
            sortedBooksY.sort((a,b)=>a.year -b.year);

        }else if(year === 'desc'){
            sortedBooksY.sort((a,b)=> b.year- a.year);

        }
        res.status(200).json(sortedBooksY)
        return;
        
    } catch (error) {
        console.error("Error in sorting by pages books:", error);
        res.status(500).json({ message: "Internal server error" });
        return;

        
    }
})


//create a server
app.listen(port, () => {
    console.log(`server is running on port :${port}`)
})




