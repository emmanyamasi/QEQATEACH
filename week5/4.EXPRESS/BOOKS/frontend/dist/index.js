var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchBooks, postBook, updateBook } from "./books";
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


      /*<button class="add-to-cart" data-title="${book.title}" data-price="${book.price}">Add to Cart</button>*/
      <button class="delete-btn" data-id="${book.id}">Delete</button>
      <button class="update-book" data-id="${book.id}">UPDATE</button>
    </div>
  `).join("");
    // Add event listeners to all update buttons
    const updateButtons = booksList.querySelectorAll(".update-book");
    updateButtons.forEach((button) => {
        const bookId = parseInt(button.getAttribute("data-id") || "0");
        const book = books.find(b => b.id === bookId);
        if (book) {
            button.onclick = () => showUpdateForm(book);
        }
    });
};
// const deleteButton = booksList.querySelector(".delete-btn") as HTMLButtonElement;
// if (deleteButton) {
//     deleteButton.setAttribute("data-id", book.id.toString());
//     deleteButton.onclick = async () => {
//         if (confirm(`Are you sure you want to delete "${book.title}"?)`) {
//             await deleteBook(book.id);
//             displayBooks(await fetchBooks()); // Refresh the book list
//         }
//     };
//         };
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
// New function to show and handle the update form
export const showUpdateForm = (book) => {
    const updateSection = document.getElementById("update-book-section");
    const updateForm = document.getElementById("update-book-form");
    const cancelUpdate = document.getElementById("cancel-update");
    if (updateSection && updateForm) {
        // Populate form with book data
        document.getElementById("update-id").value = book.id.toString();
        document.getElementById("update-title").value = book.title;
        document.getElementById("update-author").value = book.author || "";
        document.getElementById("update-genre").value = book.genre || "";
        document.getElementById("update-year").value = book.year.toString();
        document.getElementById("update-pages").value = book.pages.toString();
        document.getElementById("update-price").value = book.price.toString();
        document.getElementById("update-publisher").value = book.publisher || "";
        document.getElementById("update-description").value = book.description || "";
        document.getElementById("update-image").value = book.image || "";
        document.getElementById("update-user_id").value = book.user_id.toString();
        updateSection.style.display = "block";
        // Handle form submission
        updateForm.onsubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
            e.preventDefault();
            const updatedBook = {
                id: parseInt(document.getElementById("update-id").value),
                title: document.getElementById("update-title").value,
                author: document.getElementById("update-author").value,
                genre: document.getElementById("update-genre").value,
                year: parseInt(document.getElementById("update-year").value),
                pages: parseInt(document.getElementById("update-pages").value),
                price: parseInt(document.getElementById("update-price").value),
                publisher: document.getElementById("update-publisher").value,
                description: document.getElementById("update-description").value,
                image: document.getElementById("update-image").value,
                user_id: parseInt(document.getElementById("update-user_id").value)
            };
            try {
                yield updateBook(updatedBook);
                displayBooks(yield fetchBooks()); // Refresh the book list
                updateSection.style.display = "none";
                updateForm.reset();
                alert("Book updated successfully!");
            }
            catch (error) {
                console.error("Failed to update book:", error);
                alert("Failed to update book. Please try again.");
            }
        });
        // Handle cancel button
        if (cancelUpdate) {
            cancelUpdate.onclick = () => {
                updateSection.style.display = "none";
                updateForm.reset();
            };
        }
    }
};
// Fetch and display events on page load
export const loadBooks = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (args = "") {
    const books = yield fetchBooks(args);
    console.log("Books received in displayBooks:", books); // Debugging log
    displayBooks(books);
});
// Load books initially
loadBooks();
//# sourceMappingURL=index.js.map