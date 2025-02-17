const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
const port = process.env.PORT || 5000;

// Add session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Store this in .env
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Connect to MongoDB
    }),
    cookie: {
      secure: false, // Set to `true` in production (HTTPS required)
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, /*{ useNewUrlParser: true, useUnifiedTopology: true }*/)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Import Routes
// Example route for user authentication
const userRoutes = require("./routes/userRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Upload routes
app.use('/api/upload', uploadRoutes);

// Auth routes
app.use('/api/auth', authRoutes);

// Media routes
app.use("/api/media", mediaRoutes);

// Use routes
app.use("/api/users", userRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
