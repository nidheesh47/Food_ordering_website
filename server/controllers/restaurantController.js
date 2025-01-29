const cloudinaryInstance = require("../config/cloudinary");
const Restaurant = require("../models/restaurant");
const User = require("../models/user");
const { param, options } = require("../routes/userRoutes");
const MenuItem = require("../models/menuItem");
const createRestaurant = async (req, res) => {
  try {
    const { name, location, phone, cuisine, isOpen, menu } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }
    const imageUri = await cloudinaryInstance.uploader.upload(req.file.path);
    const restauarntExist = await Restaurant.findOne({ name: name });
    if (restauarntExist) {
      return res.status(400).json({ message: "Restaurant all ready existed" });
    }
    const newRestaurant = new Restaurant({
      name,
      location,
      phone,
      image: imageUri.url,
      cuisine,
      user: userId,
      menu,
      isOpen,
    });

    const savedRestaurant = await newRestaurant.save();
    res.status(201).json({
      message: "Restaurant created successfully",
      restaurant: savedRestaurant,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { name, location, phone, cuisine, isOpen } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restauarnt not found" });
    }
    if (name) restaurant.name = name;
    if (location) restaurant.location = location;
    if (phone) restaurant.phone = phone;
    if (cuisine) restaurant.cuisine = cuisine;
    if (isOpen) restaurant.isOpen = isOpen;
    if (req.file) {
      const imageUri = await cloudinaryInstance.uploader.upload(req.file.path);
      restaurant.image = imageUri.url;
    }
    const updatedRestaurant = await restaurant.save();
    res
      .status(200)
      .json({ message: "Restaurant updated successfully", updatedRestaurant });
  } catch (error) {
    console.error("error updating restaurant", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const allRestaurants = await Restaurant.find();
    if (!allRestaurants || allRestaurants.length === 0) {
      return res.status(404).json({ message: "No restaurant found" });
    }
    res
      .status(200)
      .json({ message: "Fetching restaurants successfully", allRestaurants });
  } catch (error) {
    console.error("error fetching restaurants", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

const getRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    if (!restaurantId) {
      return res.status(400).json({ message: "restaurant id is required" });
    }

    const restaurant = await Restaurant.findById(restaurantId).populate("menu");

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({
      message: "Fetching restaurant successfully",
      restaurant,
    });
  } catch (error) {
    console.error("Error fetching restaurant", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    if (!restaurantId) {
      return res.status(400).json({ message: "restaurant id is required" });
    }
    const restaurant = await Restaurant.findByIdAndDelete(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "restaurant is not found" });
    }
    await MenuItem.deleteMany({ _id: { $in: restaurant.menu } });
    res.status(200).json({ message: "Delete restaurant successfully" });
  } catch (error) {
    console.error("error deleting restaurant", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRestaurantByName = async (req, res) => {
  try {
    const { name } = req.params;
    const restaurants = await Restaurant.find({
      name: { $regex: name, $options: "i" },
    }).populate("menu");
    if (restaurants.length === 0) {
      return res.status(404).json({ message: "No restaurants found" });
    }
    res.status(200).json({
      message: "Restaurants found successfully",
      restaurants,
    });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createRestaurant,
  updateRestaurant,
  getAllRestaurants,
  getRestaurant,
  deleteRestaurant,
  getRestaurantByName,
};
