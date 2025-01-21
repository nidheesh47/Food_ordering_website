const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");

router.post("/add");
router.delete("/delete");
router.get("/menu-reviews/:menuId");

const reviewRouter = router;
module.exports = reviewRouter;
