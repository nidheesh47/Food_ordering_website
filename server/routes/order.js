const express = require("express");
const {
  createOrder,
  updateStatus,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

const Auth = require("../middleware/auth");
const userRole = require("../middleware/userRole");
const adminRole = require("../middleware/adminRole");
router.post("/create", Auth, userRole, createOrder);
router.put("/status", Auth, adminRole, updateStatus);
router.delete("/:orderId", Auth, userRole, deleteOrder);
const OrderRouter = router;

module.exports = OrderRouter;
