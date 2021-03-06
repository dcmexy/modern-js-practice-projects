// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Store Constructor
function Store() {}

// Add book to list
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");

  // Create tr element
  const row = document.createElement("tr");

  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete-book">X</a></td>
  `;

  list.appendChild(row);
};

// Show Alert
UI.prototype.showAlert = function (message, className) {
  // Create div
  const div = document.createElement("div");
  // Add classes
  div.className = `callout ${className}`;
  // Add message
  div.appendChild(document.createTextNode(message));
  // Get Parent
  const container = document.querySelector(".grid-container");
  const form = document.querySelector("#book-form");

  container.insertBefore(div, form);

  // Timeout after 5 seconds
  setTimeout(function () {
    document.querySelector(".callout").remove();
  }, 5000);
};

// Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete-book") {
    Store.removeBook(target.parentElement.parentElement);
    target.parentElement.parentElement.remove();
  }
};

// Clear fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// Get Books from local storage
Store.getBooks = function () {
  let books;

  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }

  return books;
};

// Display books to UI from Local Storage
Store.displayBooks = function () {
  const books = Store.getBooks();
  const ui = new UI();

  books.forEach(function (book) {
    // Add book to UI
    ui.addBookToList(book);
  });
};

// Add book to Local Storage
Store.addBook = function (book) {
  const books = Store.getBooks();

  books.push(book);

  localStorage.setItem("books", JSON.stringify(books));
};

// Remove book from Local Storage
Store.removeBook = function (book) {
  // Get Books from Local Storage if any
  const books = Store.getBooks();

  // Get index of list item
  let index = [...book.parentElement.children].indexOf(book);
  console.log(index);

  // Remove Item from list
  books.splice(index, 1);

  localStorage.setItem("books", JSON.stringify(books));
};

// DOM Load Event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

// Event Listerner for add book
document.getElementById("book-form").addEventListener("submit", function (e) {
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instatiatiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Error Alert
    ui.showAlert("Please fill in all fields", "alert");
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Add to Local Store
    Store.addBook(book);

    // Success Alert
    ui.showAlert("Book added!", "success");

    // Clear fields
    ui.clearFields();
  }
  e.preventDefault();
});

// Event listener for delete book
document.getElementById("book-list").addEventListener("click", function (e) {
  // Instantiate UI
  const ui = new UI();

  ui.deleteBook(e.target);

  // Show message
  ui.showAlert("Book removed!", "success");

  e.preventDefault();
});
