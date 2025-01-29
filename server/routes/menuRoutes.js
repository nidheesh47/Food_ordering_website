const express = require("express");
const {
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getAllMenuItemsOfRestaurant,
  getMenuItem,
  getMenuByName,
  getAllMenuItems,
} = require("../controllers/menuController");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");
const adminRole = require("../middleware/adminRole");

const router = express.Router();

// create menu items
router.post(
  "/:restaurantId/create",
  auth,
  adminRole,
  upload.single("image"),
  createMenuItem
);
router.get("/all/restaurant-menu/:restaurantId", getAllMenuItemsOfRestaurant);
router.put("/:itemId", auth, adminRole, upload.single("image"), updateMenuItem);
router.get("/:itemId", getMenuItem);
router.delete("/:itemId", auth, adminRole, deleteMenuItem);
router.get("/name/:title", getMenuByName);
router.get("/get/all/menu-items", getAllMenuItems);
const menuRouter = router;

module.exports = menuRouter;
