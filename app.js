// Basic

const express = require("express");
const router = require("./src/routes/api");

const app = express();

// Security Middleware

const rateLimit = require("express-rate-limit");

const helmet = require("helmet");

const mongoSanitize = require("express-mongo-sanitize");

const xssClean = require("xss-clean");

const hpp = require("hpp");
const cors = require("cors");

// Database Lib important

const mongoose = require("mongoose");

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Security middleware implement

app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xssClean());
app.use(hpp());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});

app.use(limiter);

// MongoDb database connection.

mongoose
  .connect("mongodb://127.0.0.1:27017/ToDo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("Connected to the database.");
  })
  .catch((error) => {
    console.error("Connection error:", error);
  });

// routing implement

app.use("/api/v1", router);

app.use("*", (req, res) => {
  res.status(404).json({ status: "failed", data: "Not Found" });
});

module.exports = app;
