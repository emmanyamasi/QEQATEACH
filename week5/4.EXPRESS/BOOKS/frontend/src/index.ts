import { fetchBooks, postBook } from "./books";



interface Book { //store book data in an array
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  pages: number;
  publisher: string;
  description: string;
  image: string;
  price: number;
  user_id: number;

}

let booksData: Book[] = [];





const displayBooks = (books: Book[]) => {
  const booksList = document.getElementById("books-list");
  if (!booksList) return;


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
  document.addEventListener("click", async (event) => {
    const target = event.target as HTMLElement;
    
    if (target.classList.contains("delete-btn")) {
      const bookId = target.getAttribute("data-id");
      if (!bookId) return;

      // Confirm before deleting
      if (!confirm("Are you sure you want to delete this book?")) return;

      try {
        const response = await  fetch(`/api/v1/books/${bookId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Book deleted successfully.");
          target.closest(".book-item")?.remove(); // Remove from UI
        } else {
          alert("Failed to delete book.");
        }
      } catch (error) {
        console.error("Error deleting book:", error);
        alert("An error occurred.");
      }
    }
  });
});






const postButton = document.getElementById("post-book") as HTMLButtonElement | null;
const postBookSection = document.getElementById("post-book-section") as HTMLElement | null;
const postBookForm = document.getElementById("post-book-form") as HTMLFormElement | null;
const cancelPost = document.getElementById("cancel-post") as HTMLButtonElement | null;

if (postButton && postBookSection && postBookForm) {
  postButton.addEventListener("click", () => {
    postBookSection.style.display = postBookSection.style.display === "none" ? "block" : "none";
  });

  postBookForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newBook = {
      title: (document.getElementById("post-title") as HTMLInputElement).value || "",
      author: (document.getElementById("post-author") as HTMLInputElement).value || "",
      genre: (document.getElementById("post-genre") as HTMLInputElement).value || "",
      year: parseInt((document.getElementById("post-year") as HTMLInputElement).value) || 0,
      pages: parseInt((document.getElementById("post-pages") as HTMLInputElement).value) || 0,
      publisher: (document.getElementById("post-publisher") as HTMLInputElement).value || "",
      description: (document.getElementById("post-description") as HTMLTextAreaElement).value || "",
      image: (document.getElementById("post-image") as HTMLInputElement).value || "",
      price: parseInt((document.getElementById("post-price") as HTMLInputElement).value) || 0,
      user_id: parseInt((document.getElementById("user_id") as HTMLInputElement).value) || 0,
    } as Omit<any, "id">;

    try {
      const postedBook = await postBook(newBook);
      booksData.push(postedBook);
      displayBooks(booksData);
      postBookForm.reset();
      postBookSection.style.display = "none";
      alert("Book posted successfully!");
    } catch (error) {
      console.error("Failed to post book:", error);
      alert("Failed to post book. Please try again.");
    }
  });

  if (cancelPost) {
    cancelPost.addEventListener("click", () => {
      postBookSection.style.display = "none";
      postBookForm.reset();
    });
  }
}







// Fetch and display events on page load
export const loadBooks = async (args: string = "") => {
  const books = await fetchBooks(args);
  console.log("Books received in displayBooks:", books);  // Debugging log
  displayBooks(books);
};

// Load books initially
loadBooks();


