const express = require("express");
const Auth = require("../middleware/auth");
const {
  addToCart,
  changeItemQuantity,
  removeCart,
} = require("../controllers/cartController");
const userRole = require("../middleware/userRole");
const router = express.Router();

router.post("/add", Auth, userRole, addToCart); // add to cart

router.post("/update/cart", Auth, userRole, changeItemQuantity); // edit cart by id

router.delete("/remove", Auth, removeCart); // clear cart

const cartRouter = router;

module.exports = cartRouter;
