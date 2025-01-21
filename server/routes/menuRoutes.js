const express = require("express");

const router = express.Router();

// create menu items
router.post("/:restaurantId/create");
router.get("/all/:restaurantId");
router.put("/:itemId");
router.get("/:itemId");
router.delete("/:itemId");
router.get("/name/:title");
const menuRouter = router;

module.exports = menuRouter;
