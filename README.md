# Complete MERN Student Management System

A beautiful, fully-featured Student Management System built using the MERN stack (MongoDB, Express, React, Node.js). 

## Features
- **User Authentication**: Secure JWT-based login and registration.
- **Dashboard**: High-level statistics of students.
- **Student Management**: Full CRUD operations (Add, View, Edit, Delete).
- **Advanced Data Table**: Includes Search, Filter, Sort, and Pagination.
- **Responsive UI**: Custom CSS layout that works on desktop, tablet, and mobile.
- **Role Isolation**: Users can only see and manage students they created.

## Tech Stack
- **Frontend**: React (Vite), React Router DOM, Axios, Context API, CSS.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose.
- **Security**: JWT (JSON Web Tokens), bcryptjs for password hashing.

## Folder Structure
See the `folder_structure_explanation.md` artifact for a detailed breakdown.

## Installation Guide

### 1. Clone the repository and install dependencies
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/student-management
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
```

### 3. Run the application
You need two terminal tabs.

**Tab 1 (Backend):**
```bash
cd server
npm run dev
```

**Tab 2 (Frontend):**
```bash
cd client
npm run dev
```

## API Documentation
All endpoints (except auth) require a Bearer Token in the `Authorization` header.

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and get token

### Students
- `GET /api/students` - Get all students (Supports `?page=1&limit=10&search=john&sort=name`)
- `GET /api/students/:id` - Get single student
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

## Deployment Guide (Render)

### Backend Deployment (Render Web Service)
1. Push your code to GitHub.
2. Go to Render.com and create a new **Web Service**.
3. Connect your GitHub repo.
4. Set Root Directory to `server`.
5. Set Build Command to `npm install`.
6. Set Start Command to `node server.js`.
7. Add Environment Variables (`MONGO_URI` with Atlas connection string, `JWT_SECRET`).

### Frontend Deployment (Render Static Site)
1. In `client/src/services/api.js`, change the `baseURL` to your deployed Render backend URL.
2. Create a new **Static Site** on Render.
3. Set Root Directory to `client`.
4. Set Build Command to `npm run build`.
5. Set Publish Directory to `dist`.
6. Set routing rules for SPAs (Rewrite all routes `/*` to `/index.html`).

## Future Improvements
- **Role-Based Access Control**: Add Admin vs Teacher roles.
- **CSV Export/Import**: Allow bulk adding students via CSV.
- **Analytics Charts**: Integrate Recharts/Chart.js on the dashboard.
- **Email Notifications**: Send automated welcome emails using NodeMailer.
