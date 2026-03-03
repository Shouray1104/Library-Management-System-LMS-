import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Pages.css";

const StudentList = () => {
  const [students] = useState([
    {
      id: 1,
      enrollmentNo: "STU001",
      studentName: "Arun Kumar",
      email: "arun@example.com",
      contact: "9876543210",
      department: "Computer Science",
      semester: "5",
    },
    {
      id: 2,
      enrollmentNo: "STU002",
      studentName: "Priya Singh",
      email: "priya@example.com",
      contact: "9876543211",
      department: "Information Technology",
      semester: "4",
    },
    {
      id: 3,
      enrollmentNo: "STU003",
      studentName: "Rajesh Patel",
      email: "rajesh@example.com",
      contact: "9876543212",
      department: "Computer Science",
      semester: "6",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(
    (student) =>
      student.enrollmentNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="list-header">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
        <Link to="/add-student" className="action-btn">
          ➕ Add Student
        </Link>
      </div>

      <div className="view-container">
        <h2 className="form-title">👥 Student List</h2>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search by Enrollment No, Name, or Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control search-input"
          />
        </div>

        {filteredStudents.length > 0 ? (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Enrollment No</th>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Department</th>
                  <th>Semester</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.enrollmentNo}</td>
                    <td>{student.studentName}</td>
                    <td>{student.email}</td>
                    <td>{student.contact}</td>
                    <td>{student.department}</td>
                    <td>{student.semester}</td>
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
            <p>📚 No students found. Click "Add Student" to create one.</p>
          </div>
        )}

        <div className="stats">
          <p>Total Students: <strong>{students.length}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
