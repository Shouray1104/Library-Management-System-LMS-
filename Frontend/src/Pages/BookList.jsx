import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Pages.css";

const BookList = () => {
  const [books] = useState([
    {
      id: 1,
      bookId: "B001",
      bookName: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "978-0-7432-7356-5",
      quantity: 5,
      category: "Fiction",
    },
    {
      id: 2,
      bookId: "B002",
      bookName: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "978-0-06-112008-4",
      quantity: 3,
      category: "Fiction",
    },
    {
      id: 3,
      bookId: "B003",
      bookName: "Sapiens",
      author: "Yuval Noah Harari",
      isbn: "978-0-06-231609-7",
      quantity: 4,
      category: "Non-Fiction",
    },
    {
      id: 4,
      bookId: "B004",
      bookName: "A Brief History of Time",
      author: "Stephen Hawking",
      isbn: "978-0-553-38016-3",
      quantity: 2,
      category: "Science",
    },
    {
      id: 5,
      bookId: "B005",
      bookName: "Dune",
      author: "Frank Herbert",
      isbn: "978-0-441-17271-3",
      quantity: 0,
      category: "Fiction",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books.filter(
    (book) =>
      book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.bookId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="list-header">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
        <Link to="/add-book" className="action-btn">
          ➕ Add Book
        </Link>
      </div>

      <div className="view-container">
        <h2 className="form-title">📚 Book List</h2>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search by Book Name, Author, or Book ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control search-input"
          />
        </div>

        {filteredBooks.length > 0 ? (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Book ID</th>
                  <th>Book Name</th>
                  <th>Author</th>
                  <th>ISBN</th>
                  <th>Category</th>
                  <th>Available</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book.id}>
                    <td>{book.bookId}</td>
                    <td>{book.bookName}</td>
                    <td>{book.author}</td>
                    <td>{book.isbn}</td>
                    <td>{book.category}</td>
                    <td>
                      <span
                        className={
                          book.quantity > 0 ? "available" : "unavailable"
                        }
                      >
                        {book.quantity > 0
                          ? `${book.quantity} copies`
                          : "Out of Stock"}
                      </span>
                    </td>
                    <td>
                      <button className="action-icon-btn" title="Edit">
                        ✏️
                      </button>
                      <button className="action-icon-btn danger" title="Delete">
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-data">
            <p>📚 No books found. Click "Add Book" to create one.</p>
          </div>
        )}

        <div className="stats">
          <p>Total Books: <strong>{books.length}</strong></p>
          <p>Total Available: <strong>{books.reduce((sum, book) => sum + book.quantity, 0)}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default BookList;
