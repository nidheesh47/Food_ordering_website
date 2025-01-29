const MenuItem = require("../models/menuItem");
const Review = require("../models/review");
const Order = require("../models/order");
const User = require("../models/user");
const addReview = async (req, res) => {
  try {
    const { foodId, rating, comment, orderId } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User is not Authorized" });
    }

    if (!foodId) {
      return res.status(400).json({ message: "Food ID is required" });
    }

    const order = await Order.findOne({
      _id: orderId,
      status: "delivered",
    }).populate({
      path: "cartId",
      populate: {
        path: "items.foodId",
      },
    });

    if (!order) {
      return res.status(400).json({ message: "No completed order found." });
    }

    const purchasedItem = order.cartId.items.find((item) => {
      if (item.foodId && item.foodId._id) {
        return item.foodId._id.toString() === foodId.toString();
      }
      return false;
    });

    if (!purchasedItem) {
      return res
        .status(400)
        .json({ message: "You have not purchased this menu item" });
    }

    if (rating > 5 || rating < 1) {
      return res
        .status(400)
        .json({ message: "Please provide a proper rating" });
    }

    const existingReview = await Review.findOne({
      userId: userId,
      menuId: foodId,
      orderId: orderId,
    });
    if (existingReview) {
      return res.status(400).json({ message: "Review Already Exist" });
    }
    // Create the review
    const review = new Review({
      userId,
      menuId: foodId,
      orderId: order._id,
      rating,
      comment,
    });

    await review.save();

    // Update the menu with the new review
    const menu = await MenuItem.findById(foodId);
    if (!menu) {
      return res.status(400).json({ message: "Menu item not found" });
    }

    menu.review.push(review._id);
    menu.rating = await averageRating(foodId);
    await menu.save();

    res.status(201).json({ message: "Review added successfully.", review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMenuReviews = async (req, res) => {
  try {
    const { menuId } = req.params;
    const review = await Review.find({ menuId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });
    if (!review.length) {
      return res
        .status(400)
        .json({ message: "No review is found for this menu" });
    }
    res.status(200).json({ message: "Review found", review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const averageRating = async (menuId) => {
  const reviews = await Review.find({ menuId });
  if (reviews.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length;
};

module.exports = {
  addReview,
  getMenuReviews,
};
