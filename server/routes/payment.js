const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");
const {
  createPayment,
  verifyPayment,
} = require("../controllers/paymentController");
const userRole = require("../middleware/userRole");
router.post("/:orderId", Auth, userRole, createPayment);
router.post("/verify", Auth, verifyPayment);
const paymentRouter = router;
module.exports = paymentRouter;
