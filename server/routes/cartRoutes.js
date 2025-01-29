const express = require("express");
const Auth = require("../middleware/auth");
const {
  addToCart,
  changeItemQuantity,
  removeCart,
} = require("../controllers/cartController");
const router = express.Router();

router.post("/add", Auth, addToCart); // add to cart

router.get("/cartId/all"); // get cart by id

router.post("/update", Auth, changeItemQuantity); // edit cart by id

router.delete("/remove", Auth, removeCart); // clear cart

const cartRouter = router;

module.exports = cartRouter;
