const cloudinaryInstance = require("../config/cloudinary");
const MenuItem = require("../models/menuItem"); // Corrected model import
const Restaurant = require("../models/restaurant");
const User = require("../models/user");

const createMenuItem = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const { title, price, description, review, rating, isAvailable } = req.body;

    if (!title || !price) {
      return res.status(400).json({ message: "Title and price are required" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const imageUri = await cloudinaryInstance.uploader.upload(req.file.path);

    const menuItemIsExist = await MenuItem.findOne({
      restaurant: restaurantId,
      title: title,
    });
    if (menuItemIsExist) {
      return res.status(400).json({ message: "Menu item already exists" });
    }

    const newMenuItem = new MenuItem({
      title,
      image: imageUri.url,
      price,
      description,
      restaurant: restaurantId,
      review,
      rating: 0,
      isAvailable,
    });

    const savedMenuItem = await newMenuItem.save();
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    restaurant.menu.push(savedMenuItem._id);
    await restaurant.save();

    res.status(201).json({
      message: "Menu Item Created and Added to Restaurant Successfully",
      savedMenuItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    const { title, price, description, isAvailable } = req.body;
    if (!itemId) {
      return res.status(400).json({ message: "itemId is required" });
    }
    const menuItem = await MenuItem.findById(itemId);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    if (title) menuItem.title = title;
    if (price) menuItem.price = price;
    if (description) menuItem.description = description;
    if (isAvailable) menuItem.isAvailable = isAvailable;
    if (req.file) {
      const imageUri = await cloudinaryInstance.uploader.upload(req.file.path);
      menuItem.image = imageUri.url;
    }
    const updatedMenuItem = await menuItem.save();
    res.status(200).json({
      message: "Menu item updated successfully",
      updatedMenuItem,
    });
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    const { itemId } = req.params;
    if (!itemId) {
      return res.status(400).json({ message: "Item id is required" });
    }
    const deleteMenuItemById = await MenuItem.findByIdAndDelete(itemId);
    if (!deleteMenuItemById) {
      return res.status(404).json({ message: "menu item is not found " });
    }
    res.status(200).json({ message: "Menu item delete successfully" });
  } catch (error) {
    {
      console.error("Error deleting menu item:", error);
      res.status(500).json({ message: error.message });
    }
  }
};

const getAllMenuItemsOfRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const menuItems = await MenuItem.find({ restaurant: restaurantId });
    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({ message: "No menu items found" });
    }
    res.status(200).json({
      message: "Menu items fetch successfully",
      menuItems,
    });
  } catch (error) {
    console.error("error fetching menu items", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMenuItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    if (!itemId) {
      return res.status(400).json({ message: "Item Id is required" });
    }
    const getMenuItemById = await MenuItem.findById(itemId).populate([
      { path: "restaurant", select: "name" },
      { path: "review" },
    ]);
    if (!getMenuItemById) {
      return res.status(404).json({ message: "No menu item found" });
    }
    res.status(200).json({
      message: "Menu item fetch successfully",
      getMenuItemById,
    });
  } catch (error) {
    console.error("error fetching menu item", error);
    res.status(500).json({
      message: error.message,
    });
  }
};
const getMenuByName = async (req, res) => {
  try {
    const { title } = req.params;
    const menu = await MenuItem.find({
      title: { $regex: title, $options: "i" },
    }).populate([{ path: "restaurant", select: "name" }, { path: "review" }]);
    if (menu.length === 0) {
      return res.status(404).json({ message: "No menu items found" });
    }
    res.status(200).json({
      message: "Menu item found successfully",
      menu,
    });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ message: error.message });
  }
};

const getAllMenuItems = async (req, res) => {
  try {
    const menu = await MenuItem.find();
    if (!menu || menu.length === 0) {
      res.status(404).json({ message: "No menuitems found" });
    }
    res.status(200).json({ message: "Found all menu items", menu });
  } catch (error) {
    console.error("Error fetching all menu items:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getAllMenuItemsOfRestaurant,
  getMenuItem,
  getMenuByName,
  getAllMenuItems,
};
