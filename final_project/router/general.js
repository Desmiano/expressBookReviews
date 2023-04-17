const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    if (isValid(username)) {
        return res.status(400).json({ message: "User already exists" });
    }
    users.push({ username, password });
    return res.status(200).json({ message: "User registered successfully" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
    //Write your code here
    getAllBooks().then((books) => {
        return res.status(200).json({ books });
    });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
    //Write your code here
    const { isbn } = req.params;
    getBookByISBN(isbn)
        .then((book) => {
            return res.status(200).json({ book });
        })
        .catch((err) => {
            return res.status(404).json({ message: "Book not found" });
    });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
    //Write your code here
    const { author } = req.params;
    getBookByAuthor(author)
    .then((book) => {
        return res.status(200).json({ book });
    })
    .catch((err) => {
        return res.status(404).json({ message: "Book not found" });
    });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
    //Write your code here
    const { title } = req.params;
    getBookByTitle(title)
    .then((book) => {
        return res.status(200).json({ book });
    })
    .catch((err) => {
        return res.status(404).json({ message: "Book not found" });
    });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
    const { isbn } = req.params;
    const book = books[isbn];
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ review: book.review });
});

// Get all books – Using async callback function
function getAllBooks() {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(books);
    }, 2000);

    return;
    });
}

// Search by ISBN – Using Promises
function getBookByISBN(isbn) {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
    const book = books[isbn];
    if (!book) {
        reject("Book not found");
        }
    resolve(book);
    }, 2000);
  });
}

// Search by author – Using async callback function
function getBookByAuthor(author) {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
    const booksByAuthor = [];
    for (const key in books) {
        if (books[key].author === author) {
            booksByAuthor.push(books[key]);
        }
    }
    if (booksByAuthor.length === 0) {
        reject("Book not found");
    }
    resolve(booksByAuthor);
    }, 2000);
  });
}

// Search by title – Using async callback function
function getBookByTitle(title) {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        for (const key in books) {
            if (books[key].title === title) {
                resolve(books[key]);
            }
    }
    reject("Book not found");
    }, 2000);
  });
}

module.exports.general = public_users;
