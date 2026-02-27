# 📊 InsightBoard — Frontend

> React-based analytics dashboard with 5 interactive charts, JWT login, and real-time data filtering.

---

## 🛠️ Tech Stack

| Tool              | Purpose                    |
|-------------------|----------------------------|
| React 19 + Vite   | UI framework & build tool  |
| React Router v7   | Client-side routing        |
| Axios             | HTTP requests to backend   |
| Chart.js          | Chart rendering engine     |
| react-chartjs-2   | React wrapper for Chart.js |
| CSS (Vanilla)     | Styling & responsiveness   |

---

## 📁 Folder Structure

```
InsightsDashboard/
├── public/
├── src/
│   ├── api/
│   │   └── axios.js          # Axios instance with JWT interceptor
│   ├── components/
│   │   └── charts/
│   │       ├── LineChart.jsx
│   │       ├── BarChart.jsx
│   │       ├── PieChart.jsx
│   │       ├── DoughnutChart.jsx
│   │       └── AreaChart.jsx
│   ├── pages/
│   │   ├── Login.jsx         # Login page (split-panel design)
│   │   └── Dashboard.jsx     # Main analytics dashboard
│   ├── App.jsx               # Routing
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
└── index.html                # Vite HTML entry
```

---

## ✨ Features

- 🔐 **JWT Authentication** — Login form, token stored in localStorage
- 📈 **5 Chart Types** — Line, Bar, Pie, Doughnut, Area
- 🔎 **3 Filters** — Category, Status, Date Range (synced with backend API)
- ⚡ **Loading & Error States** — Spinner messages + fallback dummy data
- 📱 **Responsive** — Works on mobile, tablet, and desktop

---

## 🚀 Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm run dev
```
> Runs at `http://localhost:5173`

> ⚠️ Make sure the backend server is running at `http://localhost:5000` first.

### 3. Login credentials (from backend seed)
| Field    | Value            |
|----------|------------------|
| Email    | admin@test.com   |
| Password | password123      |

---

## 📸 Screenshots

### Login Page
![Login](./screenshots/login.png)

### Analytics Dashboard
![Dashboard](./screenshots/dashboard.png)

---

## 🔗 Backend Repo

[InsightBoard Backend →](https://github.com/YOUR_USERNAME/insightboard-backend)
