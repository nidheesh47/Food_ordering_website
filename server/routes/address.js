const express = require("express");

const router = express.Router();
router.post("/add");
router.get("/:addressId");
router.put("/:addressId/update");
router.get("/:userId/addresses");
router.delete("/:addressId/delete");
const addressRouter = router;
module.exports = addressRouter;
