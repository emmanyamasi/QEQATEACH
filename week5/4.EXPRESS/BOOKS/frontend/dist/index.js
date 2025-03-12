var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchBooks, postBook } from "./books";
let booksData = [];
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
        <p><strong>Publisher:</strong> ${book.publisher}</p>
          <p><strong>Description:</strong> ${book.description}</p>
            <p><strong>pages:</strong> ${book.pages}</p>
      <p><strong>Price:</strong> $${book.price ? Number(book.price).toFixed(2) : "N/A"}</p>


      <button class="add-to-cart" data-title="${book.title}" data-price="${book.price}">Add to Cart</button>
      <button class="delete-btn" data-id="BOOK_ID">Delete</button>
      
          
    </div>
  `).join("");
};
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const target = event.target;
        if (target.classList.contains("delete-btn")) {
            const bookId = target.getAttribute("data-id");
            if (!bookId)
                return;
            // Confirm before deleting
            if (!confirm("Are you sure you want to delete this book?"))
                return;
            try {
                const response = yield fetch(`/api/v1/books/${bookId}`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    alert("Book deleted successfully.");
                    (_a = target.closest(".book-item")) === null || _a === void 0 ? void 0 : _a.remove(); // Remove from UI
                }
                else {
                    alert("Failed to delete book.");
                }
            }
            catch (error) {
                console.error("Error deleting book:", error);
                alert("An error occurred.");
            }
        }
    }));
});
const postButton = document.getElementById("post-book");
const postBookSection = document.getElementById("post-book-section");
const postBookForm = document.getElementById("post-book-form");
const cancelPost = document.getElementById("cancel-post");
if (postButton && postBookSection && postBookForm) {
    postButton.addEventListener("click", () => {
        postBookSection.style.display = postBookSection.style.display === "none" ? "block" : "none";
    });
    postBookForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const newBook = {
            title: document.getElementById("post-title").value || "",
            author: document.getElementById("post-author").value || "",
            genre: document.getElementById("post-genre").value || "",
            year: parseInt(document.getElementById("post-year").value) || 0,
            pages: parseInt(document.getElementById("post-pages").value) || 0,
            publisher: document.getElementById("post-publisher").value || "",
            description: document.getElementById("post-description").value || "",
            image: document.getElementById("post-image").value || "",
            price: parseInt(document.getElementById("post-price").value) || 0,
            user_id: parseInt(document.getElementById("user_id").value) || 0,
        };
        try {
            const postedBook = yield postBook(newBook);
            booksData.push(postedBook);
            displayBooks(booksData);
            postBookForm.reset();
            postBookSection.style.display = "none";
            alert("Book posted successfully!");
        }
        catch (error) {
            console.error("Failed to post book:", error);
            alert("Failed to post book. Please try again.");
        }
    }));
    if (cancelPost) {
        cancelPost.addEventListener("click", () => {
            postBookSection.style.display = "none";
            postBookForm.reset();
        });
    }
}
// Fetch and display events on page load
export const loadBooks = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (args = "") {
    const books = yield fetchBooks(args);
    console.log("Books received in displayBooks:", books); // Debugging log
    displayBooks(books);
});
// Load books initially
loadBooks();
//# sourceMappingURL=index.js.map