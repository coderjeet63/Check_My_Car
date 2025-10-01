# 🚗 CheckMyCar – Automotive Service Web App

**CheckMyCar** is a full-stack web application designed for automotive service centers.  
It helps customers **book appointments**, **order car parts**, and **track their service history**.  
Admins and mechanics get their own dashboards to **manage appointments, orders, and users efficiently**.

---

## 📑 Table of Contents
- [✨ Features](#-features)
- [🛠️ Tech Stack](#%EF%B8%8F-tech-stack)
- [⚙️ Installation](#%EF%B8%8F-installation)
- [🔑 Environment Variables](#-environment-variables)
- [🚀 Usage](#-usage)
- [🌐 API Endpoints](#-api-endpoints)
- [📂 File Structure](#-file-structure)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [📬 Contact](#-contact)

---

## ✨ Features
✅ **User Authentication:** Secure signup & login with **JWT tokens**  
✅ **Admin Panel:** Manage users, appointments & orders  
✅ **Mechanic Dashboard:** View and update assigned appointments  
✅ **Order Management:** Customers can browse, order parts, and track deliveries  
✅ **Payment Integration:** Integrated with **Stripe** for secure transactions  
✅ **Responsive Design:** Works on **mobile, tablet, and desktop**

---

## 🛠️ Tech Stack

### 🔹 Frontend
- ⚛️ **React.js**
- 🎨 **Tailwind CSS**
- 🔗 **Axios** for API calls

### 🔹 Backend
- 🟢 **Node.js** + **Express.js**
- 🍃 **MongoDB + Mongoose**
- 🔒 **JWT** Authentication
- 💳 **Stripe API** for payments

---

## ⚙️ Installation

### 📌 Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Stripe Account](https://stripe.com/) for payments

---

### 📥 Steps

#### 1. Clone the repository
```bash
git clone https://github.com/yourusername/checkmycar.git
cd checkmycar
2. Install dependencies
👉 For Backend:

bash
Copy code
cd backend
npm install
👉 For Frontend:

bash
Copy code
cd ../frontend
npm install
3. Start the servers
👉 Start Backend:

bash
Copy code
npm start
Runs at: http://localhost:3001

👉 Start Frontend:

bash
Copy code
npm start
Runs at: http://localhost:3000

🔑 Environment Variables
Create a .env file in the backend directory:

env
Copy code
# MongoDB connection string
MONGO_URI=your_mongo_uri_here

# JWT Secret
JWT_SECRET=your_jwt_secret_here

# Stripe API key
STRIPE_SECRET_KEY=your_stripe_secret_key_here

# Environment
NODE_ENV=development

# Backend server port
PORT=3001
🚀 Usage
👤 User Workflow
Sign Up / Login to create an account.

Browse Parts and add them to the cart.

Checkout & Pay securely via Stripe.

Book Appointments for car services.

Track Orders & Service History anytime.

🛠️ Admin Workflow
View & manage users, orders, appointments.

Assign mechanics to appointments.

Update order and service statuses.

🔧 Mechanic Workflow
View assigned appointments.

Update service progress.

🌐 API Endpoints
🔐 Authentication
POST /api/auth/register – Register new user

POST /api/auth/login – Login & get JWT

📦 Orders
POST /api/orders – Create a new order

GET /api/orders – Get all orders (admin only)

GET /api/orders/:id – Get order by ID

📅 Appointments
POST /api/appointments – Create appointment

GET /api/appointments – Get all appointments (admin & mechanic)

GET /api/appointments/:id – Get appointment by ID

👥 Users
GET /api/users – Get all users (admin only)

GET /api/users/:id – Get user by ID

🛒 Products
GET /api/products – Get all products

GET /api/products/:id – Get product by ID

📂 File Structure
pgsql
Copy code
AutoFixHub/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── App.js
    │   └── index.js
    ├── public/
    ├── .env
    └── package.json
