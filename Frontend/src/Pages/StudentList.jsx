import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getStudents } from "../services/studentsApi";
import "./Pages.css";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await getStudents();
        setStudents(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to load students. Please try again.");
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter(
    (student) =>
      student.enrollment_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase())
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

        {error && (
          <div className="error-message" style={{color: 'red', padding: '10px', marginBottom: '15px', backgroundColor: '#ffe6e6', borderRadius: '4px'}}>
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <div className="no-data">
            <p>⏳ Loading students...</p>
          </div>
        ) : filteredStudents.length > 0 ? (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Enrollment No</th>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.enrollment_number}>
                    <td>{student.enrollment_number}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.phone_number}</td>
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
