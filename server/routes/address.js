const express = require("express");
const {
  addAddress,
  editeAddress,
  getAddress,
  getAddresses,
  deleteAddress,
} = require("../controllers/addressController");
const Auth = require("../middleware/auth");
const router = express.Router();
router.post("/add", Auth, addAddress);
router.get("/:addressId", Auth, getAddress);
router.put("/:addressId/update", Auth, editeAddress);
router.get("/:userId/addresses", Auth, getAddresses);
router.delete("/:addressId/delete", Auth, deleteAddress);
const addressRouter = router;
module.exports = addressRouter;
