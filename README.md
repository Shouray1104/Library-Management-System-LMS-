# Library Management System (LMS)

A Full Stack Library Management System built using Django, MySQL, and a modern frontend.  
The system manages students, books, and book issuing operations with proper business logic and inventory tracking.

---

## Features

### Student Management
- Unique enrollment number (Primary Key)
- Student name
- Contact number (not null)
- Unique email ID

### Book Management
- Unique book ID (Primary Key)
- Book name and author
- Total copies (default: 1)
- Available copies (auto-updated on issue/return)

### Issue Management
- Foreign key relationship with Student and Book
- Automatic 7-day due date
- Fine calculation for late returns
- Restricts issuing more than 3 books per student
- Prevents issuing the same book twice to the same student
- Updates available copies dynamically

### Admin Panel
- Full management via Django Admin
- Add, update, delete, and monitor records

---

## Tech Stack

- Backend: Django
- Database: MySQL
- Frontend: (Your Frontend Technology)
- Version Control: Git & GitHub

---

## Project Structure

```
LMS/
│
├── Frontend/
│
└── Backend/
    │
    ├── students/
    ├── books/
    ├── issue_book/
    ├── Backend/        # Django project settings folder
    ├── manage.py
    └── requirements.txt
```

## How to Run Backend Locally

1. Clone the repository

   git clone <your-repository-url>

2. Navigate to backend folder

   cd LMS/Backend

3. Create virtual environment

   python -m venv venv

4. Activate virtual environment (Windows)

   venv\Scripts\activate

5. Install dependencies

   pip install -r requirements.txt

6. Apply migrations

   python manage.py migrate

7. Run the development server

   python manage.py runserver

---

## Future Improvements

- REST API integration
- Authentication and role-based access control
- Dashboard and analytics
- Cloud deployment

---

## License

This project is developed for educational purposes.
