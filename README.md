# Placement Management System

A full-stack web application developed to manage student placements, companies, job opportunities, and placement applications efficiently.

## Project Overview

The Placement Management System is a CRUD-based web application designed for colleges to manage placement-related information in one centralized system.

The system provides separate modules for:

- Students
- Companies
- Jobs
- Applications

The frontend is developed using React, while the backend is developed using Django and Django REST Framework.

## Features

### Student Management
- Add new students
- View student details
- Update student information
- Delete student records
- Store department and CGPA details

### Company Management
- Add recruiting companies
- View company information
- Update company details
- Delete company records
- Store company location and website

### Job Management
- Add job opportunities
- View available jobs
- Update job details
- Delete job records
- Store package and eligibility CGPA

### Application Management
- Apply students for available jobs
- View applications
- Update application status
- Delete applications
- Track application status

### Application Status

Applications can have the following statuses:

- Applied
- Shortlisted
- Selected
- Rejected

## Technologies Used

### Frontend
- React
- JavaScript
- HTML
- CSS
- Vite

### Backend
- Python
- Django
- Django REST Framework

### Database
- SQLite

### Development Tools
- Visual Studio Code
- Git
- GitHub

## System Architecture

```text
User
  |
  v
React Frontend
  |
  v
REST API
  |
  v
Django Backend
  |
  v
SQLite Database


API Endpoints
Students
GET    /api/students/
POST   /api/students/
GET    /api/students/{id}/
PUT    /api/students/{id}/
DELETE /api/students/{id}/
Companies
GET    /api/companies/
POST   /api/companies/
GET    /api/companies/{id}/
PUT    /api/companies/{id}/
DELETE /api/companies/{id}/
Jobs
GET    /api/jobs/
POST   /api/jobs/
GET    /api/jobs/{id}/
PUT    /api/jobs/{id}/
DELETE /api/jobs/{id}/
Applications
GET    /api/applications/
POST   /api/applications/
GET    /api/applications/{id}/
PUT    /api/applications/{id}/
DELETE /api/applications/{id}/
Project Structure
Placement-Management-System/
│
├── backend/
│   ├── config/
│   ├── placement/
│   ├── venv/
│   ├── db.sqlite3
│   └── manage.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
How to Run the Backend

Open a terminal and go to the backend folder:

cd backend

Activate the virtual environment:

venv\Scripts\activate

Start the Django server:

python manage.py runserver

The backend will run at:

http://127.0.0.1:8000/
How to Run the Frontend

Open another terminal and go to the frontend folder:

cd frontend

Install dependencies:

npm install

Start the React development server:

npm run dev

The frontend will run at:

http://localhost:5173/
Project Purpose

The main purpose of this project is to provide a simple and efficient platform for managing college placement activities.

It helps organize student information, company details, job opportunities, and applications in a centralized system.

Future Enhancements
Student and admin login
Authentication and authorization
Search and filter functionality
Placement statistics dashboard
Application notifications
Resume upload
Advanced reporting
Deployment to a cloud platform


