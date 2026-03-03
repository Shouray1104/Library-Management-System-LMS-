import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Pages.css";

const ReturnBook = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    bookId: "",
    returnDate: new Date().toISOString().split("T")[0],
    condition: "Good",
    penalty: "0",
  });

  const [returnRecords, setReturnRecords] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentId || !formData.bookId) {
      setMessage("❌ Please fill all required fields");
      return;
    }
    setReturnRecords([...returnRecords, formData]);
    setMessage("✅ Book returned successfully!");
    setFormData({
      studentId: "",
      bookId: "",
      returnDate: new Date().toISOString().split("T")[0],
      condition: "Good",
      penalty: "0",
    });
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="page-container">
      <Link to="/" className="back-link">← Back to Home</Link>
      <div className="form-card">
        <h2 className="form-title">📥 Return Book</h2>
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
            <label>Return Date</label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              disabled
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Book Condition</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="form-control"
            >
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Damaged">Damaged</option>
            </select>
          </div>

          <div className="form-group">
            <label>Penalty (₹)</label>
            <input
              type="number"
              name="penalty"
              value={formData.penalty}
              onChange={handleChange}
              placeholder="Enter Penalty Amount"
              className="form-control"
            />
          </div>

          <button type="submit" className="btn-primary">
            Return Book
          </button>
        </form>
      </div>

      {returnRecords.length > 0 && (
        <div className="table-container">
          <h3 className="table-title">Return Records</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Book ID</th>
                <th>Return Date</th>
                <th>Condition</th>
                <th>Penalty</th>
              </tr>
            </thead>
            <tbody>
              {returnRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.studentId}</td>
                  <td>{record.bookId}</td>
                  <td>{record.returnDate}</td>
                  <td>{record.condition}</td>
                  <td>₹{record.penalty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReturnBook;