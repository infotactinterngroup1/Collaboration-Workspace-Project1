# 🚀 High-Performance E-Commerce Engine (Backend)

A scalable and high-performance E-Commerce REST API built with **Node.js**, **Express.js**, **MongoDB**, and **Redis**. The project implements the **Cache-Aside Pattern** for faster product retrieval, semantic product search, secure authentication, coupon management, order processing, and an admin dashboard API.

---

## 📌 Features

### ✅ Authentication
- User Registration
- User Login (JWT Authentication)
- Protected Routes

### ✅ Product Management
- Create Product
- Get All Products
- Get Product by ID
- Update Product
- Delete Product
- Product Search
- Category Filter
- Pagination
- Sorting

### ✅ Redis Cache
- Cache-Aside Pattern
- Product List Caching
- Product Details Caching
- Dashboard Statistics Caching
- Automatic Cache Invalidation

### ✅ Shopping Cart
- Add to Cart
- Update Quantity
- Remove Product
- View Cart
- Apply Coupons

### ✅ Coupon System
- Create Coupons
- Apply Discount Codes
- Percentage-Based Discounts

### ✅ Order Management
- Place Order
- Inventory Reduction
- View User Orders
- View All Orders (Admin)
- Update Order Status

### ✅ Dashboard APIs
- Total Products
- Total Orders
- Total Revenue
- Recent Activities
- Notifications

### ✅ AI Product Search
- Product Embedding Generation
- Semantic Search Support
- MongoDB Vector Search Ready

### ✅ Logging
- Activity Logs
- Notification System

### ✅ API Documentation
- Swagger Integration
- API Information Endpoint

### ✅ Code Quality
- ESLint Configuration
- Error Handling Middleware
- Environment Variable Validation

### ✅ CI/CD
- GitHub Actions Workflow
- Automatic Lint Checks

---

# 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Redis
- JWT Authentication
- Swagger UI
- ESLint
- GitHub Actions

---

# 📂 Project Structure

```
backend/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── seed/
├── utils/
├── validators/
├── .github/
│   └── workflows/
│       └── ci.yml
├── server.js
├── package.json
└── README.md
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/infotactinterngroup1/Collaboration-Workspace-Project1/tree/main
```

Go to backend folder

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

REDIS_URL=redis://localhost:6379
```

Start the development server

```bash
npm run dev
```

---

# 🌱 Seed Database

Seed Products

```bash
npm run seed
```

Seed Coupons

```bash
node seed/seedCoupons.js
```

---

# 📌 API Endpoints

## Authentication

```
POST /api/auth/register
POST /api/auth/login
```

## Products

```
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

## Cart

```
GET    /api/cart
POST   /api/cart
PUT    /api/cart
DELETE /api/cart/:productId
```

## Coupons

```
POST /api/coupons/apply
```

## Orders

```
POST /api/orders
GET  /api/orders
PUT  /api/orders/:id/status
```

## Dashboard

```
GET /api/dashboard/stats
GET /api/dashboard/activity
GET /api/dashboard/notifications
```

---

# ⚡ Performance Features

- Redis Cache-Aside Pattern
- Cache Invalidation
- MongoDB Aggregation Pipelines
- Pagination
- Product Search
- Category Filtering
- Semantic Search Support
- Inventory Management

---

# 🧪 Testing

Run ESLint

```bash
npm run lint
```

Run Development Server

```bash
npm run dev
```

---

# 👩‍💻 Developer

**Shalini Verma**

Backend Developer

---

# 📅 Internship Project

**Project:** High-Performance E-Commerce Engine with AI Vector Search

**Duration:** 4 Weeks

**Organization:** Infotact Solutions
