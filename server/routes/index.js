const express = require("express");
const userRouter = require("./userRoutes");
const restaurantRouter = require("./restaurantRoutes");
const cartRouter = require("./cartRoutes");
const menuRouter = require("./menuRoutes");
const addressRouter = require("./address");
const couponRouter = require("./coupon");
const reviewRouter = require("./review");
const OrderRouter = require("./order");
const paymentRouter = require("./payment");
const router = express.Router();

router.use("/user", userRouter);
router.use("/restaurant", restaurantRouter);
router.use("/cart", cartRouter);
router.use("/menu-item", menuRouter);
router.use("/address", addressRouter);
router.use("/coupon", couponRouter);
router.use("/review", reviewRouter);
router.use("/order", OrderRouter);
router.use("/payment", paymentRouter);
const apiRouter = router;

module.exports = apiRouter;
