import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Pages.css";

const ViewBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample books data - in real app, this would come from API
  const [books] = useState([
    {
      bookId: "B001",
      bookName: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "978-0-7432-7356-5",
      quantity: 5,
      category: "Fiction",
    },
    {
      bookId: "B002",
      bookName: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "978-0-06-112008-4",
      quantity: 3,
      category: "Fiction",
    },
    {
      bookId: "B003",
      bookName: "Sapiens",
      author: "Yuval Noah Harari",
      isbn: "978-0-06-231609-7",
      quantity: 4,
      category: "Non-Fiction",
    },
    {
      bookId: "B004",
      bookName: "A Brief History of Time",
      author: "Stephen Hawking",
      isbn: "978-0-553-38016-3",
      quantity: 2,
      category: "Science",
    },
  ]);

  const filteredBooks = books.filter(
    (book) =>
      book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.bookId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <Link to="/" className="back-link">← Back to Home</Link>
      <div className="view-container">
        <h2 className="form-title">📚 View Books</h2>

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
                  <th>Available</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book.bookId}>
                    <td>{book.bookId}</td>
                    <td>{book.bookName}</td>
                    <td>{book.author}</td>
                    <td>{book.isbn}</td>
                    <td>
                      <span
                        className={
                          book.quantity > 0 ? "available" : "unavailable"
                        }
                      >
                        {book.quantity > 0 ? `${book.quantity} copies` : "Out of Stock"}
                      </span>
                    </td>
                    <td>{book.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-data">
            <p>📖 No books found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBooks;