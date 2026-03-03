import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const menuItems = [
    { title: "Students", path: "/students", icon: "👥", description: "Manage student records" },
    { title: "Books", path: "/books", icon: "📚", description: "Manage book inventory" },
    { title: "Issued Books", path: "/issued-books", icon: "📖", description: "Track issued books" },
  ];

  return (
    <div className="home-container">
      <div className="header">
        <h1 className="title">📖 Library Management System</h1>
        <p className="subtitle">Manage books and student records efficiently</p>
      </div>

      <div className="menu-grid">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.path} className="menu-card-link">
            <div className="menu-card">
              <div className="card-icon">{item.icon}</div>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-description">{item.description}</p>
              <p className="card-arrow">→</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;