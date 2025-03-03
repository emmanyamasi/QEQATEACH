/**class Proffessor {
    constructor(name, teaches) {
        this.name = name;
        this.teaches = teaches;
    }
    //methods
    grade(paper) {
        return `Professor ${this.name} graded the paper ${paper}`;

    }

    //2nd method
    introduceSelf() {
        return `Hello my name is Professor ${this.name} and i teach  ${this.teaches}`;


    }


}


const prof = new Proffessor("smith", "english")

console.log(prof.introduceSelf());
console.log(prof.grade("OOP")); **/







class Book {
    constructor(id, title, author, genre, year, pages, publisher, description, image, price) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.year = year;
        this.pages = pages;
        this.publisher = publisher;
        this.description = description;
        this.image = image;
        this.price = price;
    }
    //method to filter  book by genre
    static filterByGenre(books,genre){

        if (!genre) {
            return books;
        }
        return books.filter(book => book.genre && book.genre.toLowerCase()=== genre.toLowerCase());

    }

}

const url ='http://localhost:3000/books'
async function fetchBooks() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch books: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}




async function displayBooks() {
    const booksContainer = document.getElementById(`books-container`);
    const booksData = await fetchBooks();
    const books = booksData.map(book => new Book(
        book.id, book.title, book.author, book.genre,
        book.year, book.pages, book.publisher,
        book.description, book.image, book.price
    ));


    books.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
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
        booksContainer.appendChild(bookDiv);


    });

}









async function displayBooksByGenre(genre) {
    const booksContainer = document.getElementById(`books-container`);
    const booksData = await fetchBooks();
    const books = booksData.map(book => new Book(
        book.id, book.title, book.author, book.genre,
        book.year, book.pages, book.publisher,
        book.description, book.image, book.price
    ));
    const filteredBooks = Book.filterByGenre(books,genre);
    if(filteredBooks.length ===0){
        booksContainer.innerHTML = `<p> No books  found.</p>`;
        return;
    }


    filteredBooks.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
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
        booksContainer.appendChild(bookDiv);


    });
    

}


displayBooksByGenre()



