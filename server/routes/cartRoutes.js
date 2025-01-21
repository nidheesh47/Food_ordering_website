const express = require("express");
const router = express.Router();

router.post("/add");

router.get("/cartId/all");

router.post("/update");

router.delete("/remove");

const cartRouter = router;

module.exports = cartRouter;
