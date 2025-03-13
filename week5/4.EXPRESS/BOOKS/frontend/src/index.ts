import { fetchBooks, postBook, updateBook ,deleteBook} from "./books";



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
      (button as HTMLButtonElement).onclick = () => showUpdateForm(book);
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



// New function to show and handle the update form
export const showUpdateForm = (book: Book): void => {
  const updateSection = document.getElementById("update-book-section") as HTMLElement;
  const updateForm = document.getElementById("update-book-form") as HTMLFormElement;
  const cancelUpdate = document.getElementById("cancel-update") as HTMLButtonElement;

  if (updateSection && updateForm) {
    // Populate form with book data
    (document.getElementById("update-id") as HTMLInputElement).value = book.id.toString();
    (document.getElementById("update-title") as HTMLInputElement).value = book.title;
    (document.getElementById("update-author") as HTMLInputElement).value = book.author || "";
    (document.getElementById("update-genre") as HTMLInputElement).value = book.genre || "";
    (document.getElementById("update-year") as HTMLInputElement).value = book.year.toString();
    (document.getElementById("update-pages") as HTMLInputElement).value = book.pages.toString();
    (document.getElementById("update-price") as HTMLInputElement).value = book.price.toString();
    (document.getElementById("update-publisher") as HTMLInputElement).value = book.publisher || "";
    (document.getElementById("update-description") as HTMLTextAreaElement).value = book.description || "";
    (document.getElementById("update-image") as HTMLInputElement).value = book.image || "";
    (document.getElementById("update-user_id") as HTMLInputElement).value = book.user_id.toString();

    updateSection.style.display = "block";

    // Handle form submission
    updateForm.onsubmit = async (e) => {
      e.preventDefault();
      const updatedBook = {
        id: parseInt((document.getElementById("update-id") as HTMLInputElement).value),
        title: (document.getElementById("update-title") as HTMLInputElement).value,
        author: (document.getElementById("update-author") as HTMLInputElement).value,
        genre: (document.getElementById("update-genre") as HTMLInputElement).value,
        year: parseInt((document.getElementById("update-year") as HTMLInputElement).value),
        pages: parseInt((document.getElementById("update-pages") as HTMLInputElement).value),
        price: parseInt((document.getElementById("update-price") as HTMLInputElement).value),
        publisher: (document.getElementById("update-publisher") as HTMLInputElement).value,
        description: (document.getElementById("update-description") as HTMLTextAreaElement).value,
        image: (document.getElementById("update-image") as HTMLInputElement).value,
        user_id: parseInt((document.getElementById("update-user_id") as HTMLInputElement).value)
      };

      try {
        await updateBook(updatedBook);
        displayBooks(await fetchBooks()); // Refresh the book list
        updateSection.style.display = "none";
        updateForm.reset();
        alert("Book updated successfully!");
      } catch (error) {
        console.error("Failed to update book:", error);
        alert("Failed to update book. Please try again.");
      }
    };

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
export const loadBooks = async (args: string = "") => {
  const books = await fetchBooks(args);
  console.log("Books received in displayBooks:", books);  // Debugging log
  displayBooks(books);
};

// Load books initially
loadBooks();


