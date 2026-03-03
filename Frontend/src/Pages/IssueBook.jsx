import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Pages.css";

const IssueBook = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    bookId: "",
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: "",
  });

  const [issuedBooks, setIssuedBooks] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentId || !formData.bookId || !formData.dueDate) {
      setMessage("❌ Please fill all required fields");
      return;
    }
    setIssuedBooks([...issuedBooks, formData]);
    setMessage("✅ Book issued successfully!");
    setFormData({
      studentId: "",
      bookId: "",
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: "",
    });
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="page-container">
      <Link to="/" className="back-link">← Back to Home</Link>
      <div className="form-card">
        <h2 className="form-title">📤 Issue Book</h2>
        {message && <div className="message">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Student ID *</label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              placeholder="Enter Student ID"
              className="form-control"
            />
          </div>

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
            <label>Issue Date</label>
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              disabled
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Due Date *</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn-primary">
            Issue Book
          </button>
        </form>
      </div>

      {issuedBooks.length > 0 && (
        <div className="table-container">
          <h3 className="table-title">Issued Books Records</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Book ID</th>
                <th>Issue Date</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {issuedBooks.map((record, index) => (
                <tr key={index}>
                  <td>{record.studentId}</td>
                  <td>{record.bookId}</td>
                  <td>{record.issueDate}</td>
                  <td>{record.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default IssueBook;