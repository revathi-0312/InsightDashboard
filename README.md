# 📊 InsightBoard — Data Analytics Dashboard

> A full-stack real-time analytics dashboard with JWT authentication, 5+ interactive charts, and flexible data filtering.

---

## 🖥️ Project Overview

**InsightBoard** is a full-stack web application built with **React** (frontend) and **Node.js + Express** (backend). It allows authenticated users to explore sales data through interactive charts, filter by category, status, and date range — all backed by a live MongoDB database.

### Key Features
- 🔐 JWT-based login authentication
- 📈 5 interactive charts (Line, Bar, Pie, Doughnut, Area)
- 🔎 Filters: Category · Status · Date Range
- 📦 REST API with MongoDB
- 📱 Fully responsive UI
- ⚡ Loading states & API error handling with fallback data

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 19, Vite, React Router v7   |
| Charts     | Chart.js, react-chartjs-2         |
| HTTP       | Axios                             |
| Backend    | Node.js, Express.js               |
| Database   | MongoDB (Atlas), Mongoose         |
| Auth       | JWT (jsonwebtoken), bcryptjs      |
| Env Config | dotenv                            |

---

## 📁 Folder Structure

```
insightboard/
├── backend/
│   ├── config/          # MongoDB connection
│   ├── controllers/     # Auth logic
│   ├── middleware/      # JWT auth middleware
│   ├── models/          # Mongoose schemas (User, Sale)
│   ├── routes/          # API routes
│   ├── seed.js          # Database seeder
│   ├── server.js        # Express entry point
│   └── .env             # Environment variables
│
└── frontend/
    └── InsightsDashboard/
        └── src/
            ├── api/       # Axios instance
            ├── components/
            │   └── charts/  # LineChart, BarChart, PieChart, DoughnutChart, AreaChart
            ├── pages/       # Login.jsx, Dashboard.jsx
            ├── App.jsx
            ├── main.jsx
            └── index.css
```

---

## 🔌 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint            | Description              | Auth Required |
|--------|---------------------|--------------------------|---------------|
| POST   | `/api/auth/register`| Register a new user      | No            |
| POST   | `/api/auth/login`   | Login and receive JWT    | No            |


```

**Login Response:**
```json
{
  "token": "<jwt_token>"
}
```

---

### Analytics Routes — `/api/analytics`

| Method | Endpoint               | Description                    | Auth Required |
|--------|------------------------|--------------------------------|---------------|
| GET    | `/api/analytics/sales` | Get sales data with filters    | ✅ Yes (JWT)  |

**Query Parameters (all optional):**

| Param      | Example              | Description              |
|------------|----------------------|--------------------------|
| `category` | `Electronics`        | Filter by product category |
| `status`   | `Completed`          | Filter by order status   |
| `from`     | `2024-01-01`         | Start date (inclusive)   |
| `to`       | `2024-12-31`         | End date (inclusive)     |

**Example:**
```
GET /api/analytics/sales?category=Electronics&status=Completed&from=2024-01-01&to=2024-06-30
Authorization: Bearer <token>
```

---

## 🗄️ Database Schema

### `users` Collection

| Field       | Type     | Description               |
|-------------|----------|---------------------------|
| `_id`       | ObjectId | Auto-generated primary key|
| `name`      | String   | User's full name          |
| `email`     | String   | Unique email address      |
| `password`  | String   | bcrypt-hashed password    |
| `createdAt` | Date     | Auto timestamp            |
| `updatedAt` | Date     | Auto timestamp            |

### `sales` Collection

| Field       | Type     | Description                                       |
|-------------|----------|---------------------------------------------------|
| `_id`       | ObjectId | Auto-generated primary key                        |
| `product`   | String   | Product name (e.g. Laptop, Shirt)                 |
| `category`  | String   | Category: Electronics, Clothing, Books, Furniture |
| `amount`    | Number   | Sale amount in ₹                                  |
| `status`    | String   | Completed · Pending · Cancelled                   |
| `date`      | Date     | Sale date                                         |
| `createdAt` | Date     | Auto timestamp                                    |

---

## 🚀 Steps to Run Locally

### Prerequisites
- Node.js v18+
- npm
- MongoDB Atlas account (or local MongoDB)

---

### 1. Clone the Repository

```bash
git clone https://github.com/revathi-0312/InsightDashboard.git
cd insightboard
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Seed the database with sample data + test user:

```bash
node seed.js
```

Start the backend server:

```bash
npm run dev
```

> Backend runs at `http://localhost:5000`

---

### 3. Setup Frontend

Open a new terminal:

```bash
cd frontend/InsightsDashboard
npm install
npm run dev
```

> Frontend runs at `http://localhost:5173`

---

### 4. Login Credentials (from seed)

| Field    | Value            |
|----------|------------------|
| Email    | admin@test.com   |
| Password | password123      |

---

## 📸 Dashboard Screenshots

### Login Page
![Login Page](./screenshots/login.png)

### Analytics Dashboard
![Dashboard](./screenshots/dashboard.png)

---

## 👩‍💻 Author

**Revathi** — Built as part of a full-stack data analytics assignment.
