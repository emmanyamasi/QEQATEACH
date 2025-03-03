import { getData } from "./products";


interface Book {
    title: string;
    image: string;
    author: string;
    genre: string;
    year: number;
    pages: number;
    price: number;
}

export async function displayBooks() {
    let booksContainer = document.getElementById("books-container");

    if (!booksContainer) {
        booksContainer = document.createElement("div"); // Create a container for the books if it doesn't exist
        booksContainer.id = "books-container";
        document.body.appendChild(booksContainer); // Attach it to the body of HTML
    }

    booksContainer.innerHTML = ""; // Clear previous books to prevent duplication

    const books = await getData<Book[]>("http://localhost:3000/books"); // Fetch books- as an array

    if (!books || books.length === 0) { // Handles missing books, if no books are found an error is displayed
        booksContainer.innerHTML = "<p>No books found.</p>";
        return;
    }

    books.forEach(book => {
        const bookElement = document.createElement("div"); // Creating an HTML element for each book
        bookElement.classList.add("book-card"); // Add a class for styling

        bookElement.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="book-image" style="width: 150px; height: auto; display: block; margin-bottom: 10px;">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <p><strong>Year:</strong> ${book.year}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
             <button><strong>Price:</strong> $${book.price.toFixed(2)}</button>
            <hr/>
        `;

        booksContainer.appendChild(bookElement); // Add book element to the container
    });
}

// Call the function



export async function handleYearChange(order: "asc" | "desc" = "asc"): Promise<Book[]> {
    try {
        const books = await getData<Book[]>("http://localhost:3000/books");
        if (!books) {
            console.error("error no books available");
            return [];
        }

        const sorted = books.sort((a, b) => (order === "asc" ? a.year - b.year : b.year - a.year));

        // Update the display with sorted books
        let booksContainer = document.getElementById("books-container");

        if (!booksContainer) {
            booksContainer = document.createElement("div");
            booksContainer.id = "books-container";
            document.body.appendChild(booksContainer);
        }

        booksContainer.innerHTML = ""; // Clear previous content

        // Display all the sorted books with all details
        sorted.forEach(book => {
            const bookElement = document.createElement("div");
            bookElement.classList.add("book-card");

            bookElement.innerHTML = `
                <img src="${book.image}" alt="${book.title}" class="book-image" style="width: 150px; height: auto; display: block; margin-bottom: 10px;">
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Genre:</strong> ${book.genre}</p>
                <p><strong>Year:</strong> ${book.year}</p>
                <p><strong>Pages:</strong> ${book.pages}</p>
                 <button><strong>Price:</strong> $${book.price.toFixed(2)}</button>
                <hr/>
            `;

            booksContainer.appendChild(bookElement);
        });

        return sorted;
    } catch (error) {
        console.log("Error in sorting by year", error);
        return [];

    }
}




export async function handlePageChange(order: "asc" | "desc" = "asc"): Promise<Book[]> {
    try {
        const books = await getData<Book[]>("http://localhost:3000/books");
        if (!books) {
            console.error("no books available")
            return [];

        }
        const PagesSortedd = books.sort((a, b) => (order === "asc" ? a.pages - b.pages : b.pages - a.pages));
        let booksContainer = document.getElementById("books-container");
        if (!booksContainer) {
            booksContainer = document.createElement("div");
            booksContainer.id = "books-container";
            document.body.appendChild(booksContainer);

        }
        booksContainer.innerHTML = "";

        PagesSortedd.forEach(book => {
            const bookElement = document.createElement("div");
            bookElement.classList.add("book-card");

            bookElement.innerHTML = `
                <img src="${book.image}" alt="${book.title}" class="book-image" style="width: 150px; height: auto; display: block; margin-bottom: 10px;">
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Genre:</strong> ${book.genre}</p>
                <p><strong>Year:</strong> ${book.year}</p>
                <p><strong>Pages:</strong> ${book.pages}</p>
                <button><strong>Price:</strong> $${book.price.toFixed(2)}</button>
                <hr/>
            `;
            booksContainer.appendChild(bookElement);


        });
        return PagesSortedd;



    } catch (error) {
        console.log("Error in sorting by pages", error)
        return [];

    }

}



export async function handleGenreChange(genreToFilter: string): Promise<Book[]> {
    try {

        const books = await getData<Book[]>("http://localhost:3000/books");
        if (!books) {
            console.error("no books found");
            return [];

        }
        const filtered = books.filter(book => book.genre.toLowerCase() === genreToFilter.toLowerCase());
        let booksContainer = document.getElementById("books-container");
        if (!booksContainer) {
            booksContainer = document.createElement("div");
            booksContainer.id = "books-container";
            document.body.appendChild(booksContainer);

        }
        booksContainer.innerHTML = "";
        if (filtered.length === 0) {
            booksContainer.innerHTML = `<p> no  books found in the  ${genreToFilter}genre</p>`;
            return [];

        }

        filtered.forEach(book => {
            const bookElement = document.createElement("div");
            bookElement.classList.add("book-card");

            bookElement.innerHTML = `
                <img src="${book.image}" alt="${book.title}" class="book-image" style="width: 150px; height: auto; display: block; margin-bottom: 10px;">
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Genre:</strong> ${book.genre}</p>
                <p><strong>Year:</strong> ${book.year}</p>
                <p><strong>Pages:</strong> ${book.pages}</p>
                <button><strong>Price:</strong> $${book.price.toFixed(2)}</button>
                <hr/>
            `;
            booksContainer.appendChild(bookElement);


        });
        return filtered;



    } catch (error) {
        console.log("Error in filtering", error)
        return [];

    }

}


