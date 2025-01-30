const express = require("express");
const app = express();

const apiRouter = require("./routes");
const cookieParser = require("cookie-parser");
const { PORT, connectDB } = require("./config/db");
const cors = require("cors");
const port = PORT;
const db = connectDB;

db();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "PUT", "DELETE", "POST", "PATCH"],
  })
);
cookieParser();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "end point does not exist" });
});
