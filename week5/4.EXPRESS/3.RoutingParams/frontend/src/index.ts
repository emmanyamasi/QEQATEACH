import { fetchBooks } from "./events";

const displayBooks = (books: any[]) => {
  const booksList = document.getElementById("books-list");
  if (!booksList) return;


  booksList.innerHTML = books.map(book => `
    <div class="book">
     <img src="${book.image}" alt="${book.title}" class="book-image" style="width: 150px; height: auto; display: block; margin-bottom: 10px;">
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Genre:</strong> ${book.genre}</p>
      <p><strong>Year:</strong> ${book.year}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <button><strong>Price:</strong> $${book.price.toFixed(2)}</button>
          
    </div>
  `).join("");
};


// Fetch and display events on page load
const loadBooks = async (args: string = "") => {
  const books = await fetchBooks(args);
  console.log("Books received in displayBooks:", books);  // Debugging log
  displayBooks(books);
};

// Load books initially
loadBooks();

