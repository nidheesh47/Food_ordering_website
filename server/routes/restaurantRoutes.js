const express = require("express");

const router = express.Router();

router.get("/all");
router.get("/:restaurantId");
router.put("/:restaurantId"); //update restaurtant
router.post("/create"); // create restaurant
router.delete("/:restaurantId"); // delete restaurant
router.get("/name/:name");

const restaurantRouter = router;

module.exports = restaurantRouter;
