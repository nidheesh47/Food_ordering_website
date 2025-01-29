const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");
const {
  addReview,
  getMenuReviews,
  getAvergeRating,
} = require("../controllers/reviewController");
const userRole = require("../middleware/userRole");

router.post("/add", Auth, userRole, addReview);
router.delete("/delete");
router.get("/menu-reviews/:menuId", Auth, getMenuReviews);

const reviewRouter = router;
module.exports = reviewRouter;
