const express = require("express");
const {
  createRestaurant,
  updateRestaurant,
  getAllRestaurants,
  getRestaurant,
  deleteRestaurant,
  getRestaurantByName,
} = require("../controllers/restaurantController");
const Auth = require("../middleware/auth");
const upload = require("../middleware/multer");
const adminRole = require("../middleware/adminRole");

const router = express.Router();

router.get("/all", getAllRestaurants); // list all restaurant
router.get("/:restaurantId", getRestaurant); // get one restaurant
router.put(
  "/:restaurantId",
  Auth,
  adminRole,
  upload.single("image"),
  updateRestaurant
); //update restaurtant
router.post(
  "/create",
  Auth,
  adminRole,
  upload.single("image"),
  createRestaurant
); // create restaurant
router.delete("/:restaurantId", Auth, adminRole, deleteRestaurant); // delete restaurant
router.get("/name/:name", getRestaurantByName);

const restaurantRouter = router;

module.exports = restaurantRouter;
