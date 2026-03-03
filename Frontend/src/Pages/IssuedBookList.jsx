import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Pages.css";

const IssuedBookList = () => {
  const [issuedBooks] = useState([
    {
      issueId: "I001",
      studentId: "STU001",
      studentName: "Arun Kumar",
      bookId: "B001",
      bookName: "The Great Gatsby",
      issueDate: "2024-01-15",
      dueDate: "2024-02-15",
      status: "Active",
      daysRemaining: 10,
    },
    {
      issueId: "I002",
      studentId: "STU002",
      studentName: "Priya Singh",
      bookId: "B002",
      bookName: "To Kill a Mockingbird",
      issueDate: "2024-01-20",
      dueDate: "2024-02-20",
      status: "Active",
      daysRemaining: 15,
    },
    {
      issueId: "I003",
      studentId: "STU003",
      studentName: "Rajesh Patel",
      bookId: "B003",
      bookName: "Sapiens",
      issueDate: "2024-01-10",
      dueDate: "2024-02-10",
      status: "Overdue",
      daysRemaining: -5,
    },
    {
      issueId: "I004",
      studentId: "STU001",
      studentName: "Arun Kumar",
      bookId: "B004",
      bookName: "A Brief History of Time",
      issueDate: "2023-12-20",
      dueDate: "2024-01-20",
      status: "Returned",
      daysRemaining: 0,
    },
  ]);

  const [filterType, setFilterType] = useState("all");

  const filteredBooks =
    filterType === "all"
      ? issuedBooks
      : issuedBooks.filter((book) => book.status === filterType);

  const getStatusBadge = (status) => {
    const badgeClass =
      status === "Active"
        ? "badge-active"
        : status === "Overdue"
          ? "badge-overdue"
          : "badge-returned";
    return <span className={`status-badge ${badgeClass}`}>{status}</span>;
  };

  return (
    <div className="page-container">
      <div className="list-header">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
        <Link to="/issue-book" className="action-btn">
          ➕ Issue Book
        </Link>
      </div>

      <div className="view-container">
        <h2 className="form-title">📖 Issued Books</h2>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filterType === "all" ? "active" : ""}`}
            onClick={() => setFilterType("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${filterType === "Active" ? "active" : ""}`}
            onClick={() => setFilterType("Active")}
          >
            Active
          </button>
          <button
            className={`filter-btn ${
              filterType === "Overdue" ? "active" : ""
            }`}
            onClick={() => setFilterType("Overdue")}
          >
            Overdue
          </button>
          <button
            className={`filter-btn ${
              filterType === "Returned" ? "active" : ""
            }`}
            onClick={() => setFilterType("Returned")}
          >
            Returned
          </button>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Issue ID</th>
                  <th>Student Name</th>
                  <th>Book Name</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Days</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((record) => (
                  <tr key={record.issueId}>
                    <td>{record.issueId}</td>
                    <td>{record.studentName}</td>
                    <td>{record.bookName}</td>
                    <td>{record.issueDate}</td>
                    <td>{record.dueDate}</td>
                    <td>{getStatusBadge(record.status)}</td>
                    <td
                      className={
                        record.daysRemaining < 0
                          ? "text-danger"
                          : "text-success"
                      }
                    >
                      {record.daysRemaining === 0
                        ? "—"
                        : record.daysRemaining < 0
                          ? `${Math.abs(record.daysRemaining)} Overdue`
                          : `${record.daysRemaining} Left`}
                    </td>
                    <td>
                      {record.status === "Active" && (
                        <Link
                          to="/return-book"
                          className="action-icon-btn"
                          title="Return Book"
                        >
                          ↩️
                        </Link>
                      )}
                      <button
                        className="action-icon-btn danger"
                        title="Delete"
                      >
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
            <p>📖 No issued books found in this category.</p>
          </div>
        )}

        <div className="stats">
          <p>Total Issues: <strong>{issuedBooks.length}</strong></p>
          <p>
            Active:
            <strong className="text-success">
              {issuedBooks.filter((b) => b.status === "Active").length}
            </strong>
          </p>
          <p>
            Overdue:
            <strong className="text-danger">
              {issuedBooks.filter((b) => b.status === "Overdue").length}
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default IssuedBookList;
