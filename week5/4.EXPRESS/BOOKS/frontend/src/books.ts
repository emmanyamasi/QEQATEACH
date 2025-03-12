interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  pages: number;
  publisher: string;
  description: string;
  image: string;
  price:number;
  user_id: number;
}

let booksData: Book[] = [];



export const fetchBooks = async (query: string = "") => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/books${query}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
   

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`error ${response.status}:${errorText}`);
    }

    const data = await response.json();
    booksData = data;
    console.log("Data received from API:", data); // Debugging

    return booksData;// Ensure it always returns an array even if the api respose format is unexepcted
  } catch (error) {
    console.error("Error fetching books:", error);
    booksData = []
    return []; // Return an empty array if fetch fails
  }
};


export const postBook = async (book: Omit<Book, "id">): Promise<Book> => { //omits  the id because the id is usually generated in server the function  returna apromise  taht will  eventually resolve to a book object


  try {
    console.log("Sending book:", book); // Log the book object
    const response = await fetch("http://localhost:3000/api/v1/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book), //coverts the book to the json  string before sending it
    });
    console.log("📥 Raw response:", response);
    if (!response.ok) {
      const errorText = await response.text(); // Get the server's error message
      throw new Error(`Error ${response.status}: ${errorText}`);
    }
    const data = await response.json(); //converts  the response  from json  to ajavascript object

    console.log("Posted book:", data);
    return data;
  } catch (error) {
    console.error("Error posting book:", error);
    throw error;
  }
};





