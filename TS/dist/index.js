var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getData } from "./products";
export function displayBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        let booksContainer = document.getElementById("books-container");
        if (!booksContainer) {
            booksContainer = document.createElement("div"); // Create a container for the books if it doesn't exist
            booksContainer.id = "books-container";
            document.body.appendChild(booksContainer); // Attach it to the body of HTML
        }
        booksContainer.innerHTML = ""; // Clear previous books to prevent duplication
        const books = yield getData("http://localhost:3000/books"); // Fetch books- as an array
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
    });
}
// Call the function
export function handleYearChange() {
    return __awaiter(this, arguments, void 0, function* (order = "asc") {
        try {
            const books = yield getData("http://localhost:3000/books");
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
        }
        catch (error) {
            console.log("Error in sorting by year", error);
            return [];
        }
    });
}
export function handlePageChange() {
    return __awaiter(this, arguments, void 0, function* (order = "asc") {
        try {
            const books = yield getData("http://localhost:3000/books");
            if (!books) {
                console.error("no books available");
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
        }
        catch (error) {
            console.log("Error in sorting by pages", error);
            return [];
        }
    });
}
export function handleGenreChange(genreToFilter, sortByYear, sortByPages) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const books = yield getData("http://localhost:3000/books");
            if (!books) {
                console.error("No books found");
                return [];
            }
            // Filter books by genre
            let filtered = genreToFilter ? books.filter(book => book.genre.toLowerCase() === genreToFilter.toLowerCase()) : books;
            // Sorting by Year
            if (sortByYear) {
                filtered.sort((a, b) => sortByYear === "asc" ? a.year - b.year : b.year - a.year);
            }
            // Sorting by Pages
            if (sortByPages) {
                filtered.sort((a, b) => sortByPages === "asc" ? a.pages - b.pages : b.pages - a.pages);
            }
            // Update UI
            let booksContainer = document.getElementById("books-container");
            if (!booksContainer) {
                booksContainer = document.createElement("div");
                booksContainer.id = "books-container";
                document.body.appendChild(booksContainer);
            }
            booksContainer.innerHTML = "";
            if (filtered.length === 0) {
                booksContainer.innerHTML = `<p>No books found in the ${genreToFilter} genre</p>`;
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
        }
        catch (error) {
            console.error("Error in filtering", error);
            return [];
        }
    });
}
//# sourceMappingURL=index.js.map