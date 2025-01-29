const Cart = require("../models/cart");
const MenuItem = require("../models/menuItem");
const Restauarnt = require("../models/restaurant");
const User = require("../models/user");

const addToCart = async (req, res) => {
  const { userId, restaurantId, foodId, quantity } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const role = req.user.role;
    if (!user || role !== "user") {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    // Check if the user already has a cart
    let cart = await Cart.findOne({ userId });

    // If the cart exists and it's from a different restaurant
    if (cart && cart.restaurantId.toString() !== restaurantId) {
      return res.status(400).json({
        message:
          "You can only order food from one restaurant at a time. Please clear your cart before ordering from another restaurant.",
      });
    }

    // Fetch the food item's price
    const menuItem = await MenuItem.findById(foodId);
    if (!menuItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    const itemPrice = menuItem.price;
    const totalItemPrice = itemPrice * quantity;

    if (!cart) {
      // Create a new cart
      cart = new Cart({
        userId,
        restaurantId,
        items: [{ foodId, quantity, totalItemPrice }],
        totalPrice: totalItemPrice,
        finalPrice: totalItemPrice,
      });
    } else {
      // Update the existing cart
      const itemIndex = cart.items.findIndex(
        (item) => item.foodId.toString() === foodId
      );

      if (itemIndex > -1) {
        // Update quantity and price of an existing item
        cart.items[itemIndex].quantity += quantity;
        cart.items[itemIndex].totalItemPrice += totalItemPrice;
      } else {
        // Add a new item to the cart
        cart.items.push({ foodId, quantity, totalItemPrice });
      }

      // Recalculate total price and final price
      cart.totalPrice += totalItemPrice;
      cart.finalPrice = cart.totalPrice - (cart.discount || 0);
    }

    await cart.save();
    const populatedCart = await Cart.findById(cart._id)
      .populate("userId", "name") // Populate user details (name)
      .populate("items.foodId", "title price") // Populate food details like name and price
      .populate("restaurantId", "name location");
    res.status(200).json({ cart: populatedCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changeItemQuantity = async (req, res) => {
  const { userId, foodId, action } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const role = req.user.role;
    if (!user || role !== "user") {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    // Check if all required fields are present
    if (!userId || !foodId || !action) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the food item in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.foodId.toString() === foodId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Food item not found in cart" });
    }

    // Find the menu item to get its price
    const menuItem = await MenuItem.findById(foodId);
    if (!menuItem) {
      return res
        .status(404)
        .json({ message: "Food item not found in the menu" });
    }

    const itemPrice = menuItem.price;
    let newQuantity = cart.items[itemIndex].quantity;

    // Handle increment or decrement of quantity
    if (action === "increment") {
      newQuantity += 1;
    } else if (action === "decrement") {
      if (newQuantity > 1) {
        newQuantity -= 1;
      } else {
        // If quantity is 1 and decrement is requested, remove item from cart
        cart.items.splice(itemIndex, 1);
        newQuantity = 0; // Set new quantity to 0 since the item is removed
      }
    } else {
      return res
        .status(400)
        .json({ message: "Invalid action. Use 'increment' or 'decrement'" });
    }

    if (newQuantity > 0) {
      // Update the item quantity and total price if the item is still in the cart
      cart.items[itemIndex].quantity = newQuantity;
      cart.items[itemIndex].totalItemPrice = itemPrice * newQuantity;
    }

    // Recalculate total price and final price
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.totalItemPrice,
      0
    );
    cart.finalPrice = cart.totalPrice - (cart.discount || 0);

    // Save the updated cart
    await cart.save();

    // Respond with the updated cart
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const removeCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    const cart = await Cart.findOneAndDelete({ userId });
    if (!cart) {
      return res.status(400).json({ message: "No items found in cart" });
    }
    res.status(200).json({ message: "Cart item remove successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { addToCart, changeItemQuantity, removeCart };
