# 📊 InsightBoard — Backend API

> RESTful API server for the InsightBoard analytics dashboard. Built with Node.js, Express, and MongoDB.

---

## 🛠️ Tech Stack

| Tool         | Purpose                  |
|--------------|--------------------------|
| Node.js      | Runtime                  |
| Express.js   | Web framework            |
| MongoDB Atlas| Database                 |
| Mongoose     | ODM for MongoDB          |
| jsonwebtoken | JWT auth tokens          |
| bcryptjs     | Password hashing         |
| dotenv       | Environment variables    |

---

## 📁 Folder Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   └── authController.js  # Register & Login logic
├── middleware/
│   └── authMiddleware.js  # JWT verification
├── models/
│   ├── User.js            # User schema
│   └── Sale.js            # Sale schema
├── routes/
│   ├── authRoutes.js      # /api/auth
│   └── analyticsRoutes.js # /api/analytics
├── seed.js                # Seeds DB with sample data + test user
├── server.js              # App entry point
└── .env                   # Environment variables (not committed)
```

---

## 🔌 API Endpoints

### Auth — `/api/auth`

| Method | Route              | Description           | Auth |
|--------|--------------------|-----------------------|------|
| POST   | `/api/auth/register` | Register new user    | No   |
| POST   | `/api/auth/login`    | Login, get JWT token | No   |

**Login Request:**
```json
{ "email": "admin@test.com", "password": "password123" }
```
**Login Response:**
```json
{ "token": "<jwt_token>" }
```

---

### Analytics — `/api/analytics`

| Method | Route                  | Description            | Auth       |
|--------|------------------------|------------------------|------------|
| GET    | `/api/analytics/sales` | Get filtered sales data| ✅ Bearer JWT |

**Query Params (all optional):**

| Param      | Example        |
|------------|----------------|
| `category` | `Electronics`  |
| `status`   | `Completed`    |
| `from`     | `2024-01-01`   |
| `to`       | `2024-12-31`   |

---

## 🗄️ Database Schema

### `users`
| Field      | Type     | Notes            |
|------------|----------|------------------|
| `name`     | String   | Required         |
| `email`    | String   | Unique, required |
| `password` | String   | bcrypt hashed    |

### `sales`
| Field      | Type   | Notes                                    |
|------------|--------|------------------------------------------|
| `product`  | String | e.g. Laptop, Shirt                       |
| `category` | String | Electronics / Clothing / Books / Furniture |
| `amount`   | Number | Sale amount in ₹                         |
| `status`   | String | Completed / Pending / Cancelled          |
| `date`     | Date   | Sale date                                |

---

## 🚀 Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Create `.env` file
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

### 3. Seed the database
```bash
node seed.js
```
> Creates 50 sample sales records + a test user: `admin@test.com` / `password123`

### 4. Start the server
```bash
npm run dev
```
> Runs at `http://localhost:5000`

---

## 🔗 Frontend Repo

[InsightBoard Frontend →](https://github.com/YOUR_USERNAME/insightboard-frontend)
