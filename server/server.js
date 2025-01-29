const express = require("express");
const app = express();

const apiRouter = require("./routes");
const cookieParser = require("cookie-parser");
const { PORT, connectDB } = require("./config/db");

const port = PORT;
const db = connectDB;

db();

app.use(cookieParser());

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
