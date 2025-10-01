require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();
const db = require("./conn/conn"); // Import your database connection file

// Middleware imports
const authenticateToken = require("./middleware/authMiddleware");
const authenticateAdmin = require("./middleware/adminAuthMiddleware");

// ==========================================================
// ### CORRECT CORS SETUP ###
// ==========================================================
// Woh saare URLs jinko aap permission dena chahte hain
const allowedOrigins = [
  'http://localhost:3001', // Common local port for React
  'https://check-my-car-frontend.onrender.com' // Aapka live frontend
];

const corsOptions = {
  origin: function (origin, callback) {
    // Agar request allowedOrigins wali list mein hai, to use allow karo
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Agar request kahin aur se aa rahi hai, to use block karo
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
// ==========================================================

// Body parser setup
app.use(bodyParser.json());
app.use(express.json()); // Parse JSON requests

// Serve static files (for profile images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes setup
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/ProductRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const orderRoutes = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contactRoutes");
const cartRoutes = require("./routes/cartRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

// Use routes with appropriate middleware for authentication and authorization
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api", paymentRoutes);

// Protect service routes with authentication and admin authorization
app.use("/api/services", serviceRoutes);

app.post("/api/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error", error: err.message });
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});