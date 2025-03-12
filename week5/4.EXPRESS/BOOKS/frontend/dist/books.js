var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let booksData = [];
export const fetchBooks = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (query = "") {
    try {
        const response = yield fetch(`http://localhost:3000/api/v1/books${query}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
            const errorText = yield response.text();
            throw new Error(`error ${response.status}:${errorText}`);
        }
        const data = yield response.json();
        booksData = data;
        console.log("Data received from API:", data); // Debugging
        return booksData; // Ensure it always returns an array even if the api respose format is unexepcted
    }
    catch (error) {
        console.error("Error fetching books:", error);
        booksData = [];
        return []; // Return an empty array if fetch fails
    }
});
export const postBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Sending book:", book); // Log the book object
        const response = yield fetch("http://localhost:3000/api/v1/books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book), //coverts the book to the json  string before sending it
        });
        console.log("📥 Raw response:", response);
        if (!response.ok) {
            const errorText = yield response.text(); // Get the server's error message
            throw new Error(`Error ${response.status}: ${errorText}`);
        }
        const data = yield response.json(); //converts  the response  from json  to ajavascript object
        console.log("Posted book:", data);
        return data;
    }
    catch (error) {
        console.error("Error posting book:", error);
        throw error;
    }
});
//# sourceMappingURL=books.js.map