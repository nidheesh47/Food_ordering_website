const express = require("express");
const Auth = require("../middleware/auth");
const { addCoupon, updateCoupon } = require("../controllers/couponController");
const router = express.Router();
router.post("/add", Auth, addCoupon);
router.put("/update/:couponId", Auth, updateCoupon);

const couponRouter = router;

module.exports = couponRouter;
