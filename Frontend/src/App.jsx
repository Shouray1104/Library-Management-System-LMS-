import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import StudentList from "./Pages/StudentList";
import BookList from "./Pages/BookList";
import IssuedBookList from "./Pages/IssuedBookList";
import AddStudent from "./Pages/AddStudent";
import AddBook from "./Pages/AddBook";
import IssueBook from "./Pages/IssueBook";
import ReturnBook from "./Pages/ReturnBook";
import ViewBooks from "./Pages/ViewBooks";
import ViewIssued from "./Pages/ViewIssued";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/students" element={<StudentList />} />
      <Route path="/books" element={<BookList />} />
      <Route path="/issued-books" element={<IssuedBookList />} />
      <Route path="/add-student" element={<AddStudent />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/issue-book" element={<IssueBook />} />
      <Route path="/return-book" element={<ReturnBook />} />
      <Route path="/view-books" element={<ViewBooks />} />
      <Route path="/view-issued" element={<ViewIssued />} />
    </Routes>
  );
}

export default App;