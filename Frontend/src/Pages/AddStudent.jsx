import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createStudent } from "../services/studentsApi";
import "./Pages.css";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    enrollment_number: "",
    name: "",
    email: "",
    contact_info: "",
    phone_number: "",
  });

  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.enrollment_number ||
      !formData.name ||
      !formData.email ||
      !formData.contact_info ||
      !formData.phone_number
    ) {
      setMessage("❌ Please fill all required fields");
      return;
    }
    
    setLoading(true);
    try {
      const response = await createStudent(formData);
      setStudents([...students, response.data]);
      setMessage("✅ Student added successfully!");
      setFormData({
        enrollment_number: "",
        name: "",
        email: "",
        contact_info: "",
        phone_number: "",
      });
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ Error adding student: " + (error.response?.data?.error || error.message));
      console.error("Error:", error);
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
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
              name="enrollment_number"
              value={formData.enrollment_number}
              onChange={handleChange}
              placeholder="Enter Enrollment Number"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Student Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
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
            <label>Contact Information *</label>
            <input
              type="text"
              name="contact_info"
              value={formData.contact_info}
              onChange={handleChange}
              placeholder="Enter Contact Information"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              className="form-control"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Adding..." : "Add Student"}
          </button>
        </form>
      </div>

      {students.length > 0 && (
        <div className="table-container">
          <h3 className="table-title">Recently Added Students</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Enrollment No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Contact Info</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{student.enrollment_number}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone_number}</td>
                  <td>{student.contact_info}</td>
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