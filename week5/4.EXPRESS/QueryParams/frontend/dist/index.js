var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c;
import { fetchBooks } from "./events";
import { fetchBooksFilter } from "./events";
import { fetchBooksSortP } from "./events";
import { fetchBooksSortY } from "./events";
import { addToCart, updateCartDisplay, removefromCart } from "./cart";
const displayBooks = (books) => {
    const booksList = document.getElementById("books-list");
    if (!booksList)
        return;
    booksList.innerHTML = books.map(book => `
    <div class="book">
     <img src="${book.image}" alt="${book.title}" class="book-image" style="width: 150px; height: auto; display: block; margin-bottom: 10px;">
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Genre:</strong> ${book.genre}</p>
      <p><strong>Year:</strong> ${book.year}</p>
      <p><strong>Price:</strong> $${book.price.toFixed(2)}</p>
      <button class="add-to-cart" data-title="${book.title}" data-price="${book.price}">Add to Cart</button>
          
    </div>
  `).join("");
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const target = event.target;
            const title = target.getAttribute("data-title");
            const price = parseFloat(target.getAttribute("data-price"));
            addToCart(title, price);
            alert(`${title} added to cart`);
        });
    });
    document.querySelectorAll(".remove-from-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const target = event.target;
            const title = target.getAttribute("data-title");
            removefromCart(title);
            updateCartDisplay(); // Ensure UI updates after removing
        });
    });
};
// Fetch and display events on page load
const loadBooks = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (args = "") {
    const books = yield fetchBooks(args);
    console.log("Books received in displayBooks:", books); // Debugging log
    displayBooks(books);
});
// Load books initially
loadBooks();
(_a = document.getElementById("genre-select")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", (event) => __awaiter(void 0, void 0, void 0, function* () {
    const genre = event.target.value;
    console.log("Selected genre:", genre);
    const queryParams = `?genre=${encodeURIComponent(genre)}`;
    const filteredBooks = yield fetchBooksFilter(queryParams);
    console.log("filteredBooks", filteredBooks);
    displayBooks(filteredBooks);
}));
(_b = document.getElementById("page-select")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", (event) => __awaiter(void 0, void 0, void 0, function* () {
    const page = event.target.value;
    console.log("selected pages:", page);
    const queryParams = `?pages=${encodeURIComponent(page)}`;
    const sortedBooksP = yield fetchBooksSortP(queryParams);
    console.log("sortedBooks", sortedBooksP);
    displayBooks(sortedBooksP);
}));
(_c = document.getElementById("year-select")) === null || _c === void 0 ? void 0 : _c.addEventListener("change", (event) => __awaiter(void 0, void 0, void 0, function* () {
    const year = event.target.value;
    console.log("selected year:", year);
    const queryParams = `?year=${encodeURIComponent(year)}`;
    const sortedBooksY = yield fetchBooksSortY(queryParams);
    console.log("sortedBooksy", sortedBooksY);
    displayBooks(sortedBooksY);
}));
//# sourceMappingURL=index.js.map