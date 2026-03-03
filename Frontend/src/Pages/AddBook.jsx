import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Pages.css";

const AddBook = () => {
  const [formData, setFormData] = useState({
    bookId: "",
    bookName: "",
    author: "",
    isbn: "",
    quantity: "",
    category: "",
  });

  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.bookId ||
      !formData.bookName ||
      !formData.author ||
      !formData.isbn
    ) {
      setMessage("❌ Please fill all required fields");
      return;
    }
    setBooks([...books, formData]);
    setMessage("✅ Book added successfully!");
    setFormData({
      bookId: "",
      bookName: "",
      author: "",
      isbn: "",
      quantity: "",
      category: "",
    });
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="page-container">
      <Link to="/" className="back-link">← Back to Home</Link>
      <div className="form-card">
        <h2 className="form-title">📚 Add New Book</h2>
        {message && <div className="message">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Book ID *</label>
            <input
              type="text"
              name="bookId"
              value={formData.bookId}
              onChange={handleChange}
              placeholder="Enter Book ID"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Book Name *</label>
            <input
              type="text"
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
              placeholder="Enter Book Name"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Author *</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter Author Name"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>ISBN *</label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="Enter ISBN"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter Quantity"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select Category</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="Technology">Technology</option>
            </select>
          </div>

          <button type="submit" className="btn-primary">
            Add Book
          </button>
        </form>
      </div>

      {books.length > 0 && (
        <div className="table-container">
          <h3 className="table-title">Added Books</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Book Name</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>Quantity</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index}>
                  <td>{book.bookId}</td>
                  <td>{book.bookName}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>{book.quantity || "N/A"}</td>
                  <td>{book.category || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddBook;