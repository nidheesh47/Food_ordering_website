const express = require("express");
const userRouter = require("./userRoutes");
const router = express.Router();

router.use("/user", userRouter);
const apiRouter = router;

module.exports = apiRouter;
