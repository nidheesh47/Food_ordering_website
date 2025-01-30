const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Order = require("../models/order");
const User = require("../models/user");
const { applyCoupon } = require("./couponController");

const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cartId, deliveryAddressId, couponCodeId, status } = req.body;
    const user = await User.findById(userId);
    const role = req.role;
    if (!user) {
      return res.status(400).json({ message: "User is not Authorized" });
    }

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    if (!couponCodeId) {
      return res.status(400).json({ message: "coupon id required" });
    }
    const coupon = await Coupon.findById(couponCodeId);
    const totalprice = cart.totalPrice;
    let finalPrice = await applyCoupon(totalprice, couponCodeId);
    const existingOrder = await Order.findOne({ userId, status: "pending" });

    if (existingOrder) {
      // Update existing pending order
      if (couponCodeId) existingOrder.couponCodeId = couponCodeId;
      if (deliveryAddressId)
        existingOrder.deliveryAddressId = deliveryAddressId;
      if (existingOrder.status === "confirmed") {
        if (status === "cancelled") existingOrder.status = status;
      }
      existingOrder.finalPrice = finalPrice; // Update the final price with the new coupon
      existingOrder.discount = coupon.discountValue; // Update the discount if it's changed
      await existingOrder.save(); // Save the updated order
      return res
        .status(200)
        .json({ message: "Order updated successfully", order: existingOrder });
    }
    const order = new Order({
      userId,

      cartId,
      couponCodeId,
      deliveryAddressId,
      finalPrice,
      discount: coupon.discountValue,
    });

    await order.save();

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User is not Authorized" });
    }
    const { status, orderId } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "No order found" });
    }
    if (order.status === "cancelled") {
      return res
        .status(400)
        .json({ message: "Cannot update status for cancelled order" });
    }
    const orderStatus = [
      "confirmed",
      "preparing",
      "out for delivery",
      "delivered",
    ];
    const currentIndex = orderStatus.findIndex((s) => s === order.status);
    const requestedIndex = orderStatus.findIndex((s) => s === status);

    // Validate the requested status
    if (requestedIndex === -1) {
      return res.status(400).json({ message: "Invalid status provided" });
    }

    // Ensure the requested status follows the correct transition order
    if (requestedIndex !== currentIndex + 1) {
      return res.status(400).json({
        message: `Cannot update status to '${status}'. Current status: '${
          order.status
        }', allowed next status: '${orderStatus[currentIndex + 1] || "none"}'`,
      });
    }

    order.status = status;
    await order.save();
    res.status(200).json({ message: "Updated sucessfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).json({ message: "No order found" });
    }
    res.status(200).json({ message: "order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, updateStatus, deleteOrder };
