import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Pages.css";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    enrollmentNo: "",
    studentName: "",
    email: "",
    contact: "",
    department: "",
    semester: "",
  });

  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.enrollmentNo ||
      !formData.studentName ||
      !formData.email ||
      !formData.contact
    ) {
      setMessage("❌ Please fill all required fields");
      return;
    }
    setStudents([...students, formData]);
    setMessage("✅ Student added successfully!");
    setFormData({
      enrollmentNo: "",
      studentName: "",
      email: "",
      contact: "",
      department: "",
      semester: "",
    });
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="page-container">
      <Link to="/" className="back-link">← Back to Home</Link>
      <div className="form-card">
        <h2 className="form-title">👨‍🎓 Add New Student</h2>
        {message && <div className="message">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Enrollment Number *</label>
            <input
              type="text"
              name="enrollmentNo"
              value={formData.enrollmentNo}
              onChange={handleChange}
              placeholder="Enter Enrollment Number"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Student Name *</label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="Enter Student Name"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Email ID *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email ID"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Contact Number *</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter Contact Number"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
            </select>
          </div>

          <div className="form-group">
            <label>Semester</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select Semester</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
              <option value="7">Semester 7</option>
              <option value="8">Semester 8</option>
            </select>
          </div>

          <button type="submit" className="btn-primary">
            Add Student
          </button>
        </form>
      </div>

      {students.length > 0 && (
        <div className="table-container">
          <h3 className="table-title">Added Students</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Enrollment No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Department</th>
                <th>Semester</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{student.enrollmentNo}</td>
                  <td>{student.studentName}</td>
                  <td>{student.email}</td>
                  <td>{student.contact}</td>
                  <td>{student.department || "N/A"}</td>
                  <td>{student.semester || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddStudent;