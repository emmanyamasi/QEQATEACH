let cart = []; // 🛒 Cart array to store selected books

// Fetch books from API
async function fetchBooks() {
    try {
        const response = await fetch("http://localhost:3000/books");
        const books = await response.json();
        console.log("Fetched books", books);
        return books;
    } catch (error) {
        console.log("Error fetching books", error);
        return [];
    }
}

// Special Book Check: Flag if genre is Dystopian
async function specialBook(fetchBooks, callbackFn) {
    try {
        const books = await fetchBooks();
        books.forEach(book => {
            if (book.genre === "Dystopian") {
                callbackFn(book);
            }
        });
    } catch (error) {
        console.log("Error in specialBook", error);
    }
}

function evaluate(book) {
    console.log(`Caution: "${book.title}" is a Dystopian Future.`);
}
specialBook(fetchBooks, evaluate);

// Display Books in List
async function displayBooks(filteredBooks = []) {
    const books = filteredBooks.length ? filteredBooks : await fetchBooks();
    console.log("Displaying Books:", books.length);

    const booksList = document.getElementById("book-list");
    booksList.innerHTML = ""; // Clear existing list

    books.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="book-image">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <p><strong>Year:</strong> ${book.year}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Publisher:</strong> ${book.publisher}</p>
            <p class="description">${book.description}</p>
            <p class="price">Price: ${book.price}</p>
            <button class="add-to-cart" data-id="${book.id}">ADD TO CART</button>
        `;
        booksList.appendChild(bookCard);
    });

    // Attach event listeners for Add to Cart buttons
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            addToCart(this.dataset.id, books);
        });
    });
}

// Add to Cart Function
function addToCart(bookId, books) {
    const selectedBook = books.find(book => book.id == bookId);
    if (!selectedBook) return;

    // Prevent duplicate entries
    let existingItem = cart.find(item => item.id == bookId);
    if (existingItem) {
        alert("Book is already in the cart!");
        return;
    }

    cart.push(selectedBook);
    updateCart();
}

// Update Cart Display
function updateCart() {
    const cartList = document.querySelector(".listCart");
    cartList.innerHTML = "";

    if (cart.length === 0) {
        cartList.innerHTML = "<p>Your cart is empty</p>";
    } else {
        cart.forEach((book, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${book.image}" alt="${book.title}" class="cart-image">
                <div class="cart-details">
                    <h4>${book.title}</h4>
                    <p>Price: ${book.price}</p>
                    <button class="remove-from-cart" data-id="${book.id}">Remove</button>
                </div>
            `;
            cartList.appendChild(cartItem);
        });

        // Attach event listeners for Remove buttons
        document.querySelectorAll(".remove-from-cart").forEach(button => {
            button.addEventListener("click", function () {
                removeFromCart(this.dataset.id);
            });
        });
    }

    // Update cart count in cart icon
    document.querySelector(".icon span").textContent = cart.length;

    // Calculate and display total price
    calculateTotal();
}

// Remove from Cart
l
function removeFromCart(bookId) {
    cart = cart.filter(book => book.id != bookId);
    updateCart();
}

// Calculate Total Price
function calculateTotal() {
    const totalPrice = cart.reduce((sum, book) => sum + parseFloat(book.price), 0); // Convert price to number
    const totalElement = document.querySelector(".cart-total");
    totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Genre Filter
async function handleGenreChange() {
    const selected = document.getElementById("genre-select").value;
    const books = await fetchBooks();
    const filtered = selected ? books.filter(book => book.genre.toLowerCase() === selected.toLowerCase()) : books;
    displayBooks(filtered);
}

// Year Sorting
async function handleYearChange(order = "asc") {
    try {
        const books = await fetchBooks();
        const sorted = books.sort((a, b) => (order === "asc" ? a.year - b.year : b.year - a.year));
        displayBooks(sorted);
    } catch (error) {
        console.log("Error in sorting by year", error);
    }
}

// Pages Sorting
async function handlePageChange(order = "desc") {
    try {
        const books = await fetchBooks();
        const sortedBooks = books.sort((a, b) => (order === "asc" ? a.pages - b.pages : b.pages - a.pages));
        displayBooks(sortedBooks);
    } catch (error) {
        console.log("Error in sorting by pages", error);
    }
}

// Cart Modal Handling
document.addEventListener("DOMContentLoaded", () => {
    const cartTab = document.querySelector(".cartTab");
    const closeBtn = document.querySelector(".cartTab .close");
    const cartButton = document.querySelector(".icon");

    // Open Cart
    cartButton.addEventListener("click", () => {
        cartTab.style.right = "0"; // Show cart
    });

    // Close Cart
    closeBtn.addEventListener("click", () => {
        cartTab.style.right = "-400px"; // Hide cart
    });

    // Add total price display inside cart modal
    const cartList = document.querySelector(".listCart");
    const totalDiv = document.createElement("div");
    totalDiv.classList.add("cart-total");
    totalDiv.textContent = "Total: $0.00";
    cartList.appendChild(totalDiv);

    // Load initial books
    displayBooks();
    handlePageChange("desc");
});


