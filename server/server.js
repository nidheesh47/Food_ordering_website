const express = require("express");
const app = express();

const apiRouter = require("./routes");
const cookieParser = require("cookie-parser");
const { PORT, connectDB } = require("./config/db");
const cors = require("cors");

const port = PORT;

// Connect to the database
connectDB();

// Middleware
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON bodies

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173", // For local development
  "https://food-ordering-website-virid.vercel.app", // For production
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Block the request
      }
    },
    credentials: true, // Allow credentials (cookies, authorization headers)
    methods: ["GET", "PUT", "DELETE", "POST", "PATCH"], // Allowed HTTP methods
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/api", apiRouter);

// 404 Handler
app.all("*", (req, res) => {
  res.status(404).json({ message: "Endpoint does not exist" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
