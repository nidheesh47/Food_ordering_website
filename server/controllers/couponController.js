const Cart = require("../models/cart");
const Coupon = require("../models/coupon");

const addCoupon = async (req, res) => {
  try {
    const { code, discountValue, minOrderAmount, expirationDate, isActive } =
      req.body;
    if (!code || !discountValue || !minOrderAmount || !expirationDate) {
      return res.status(400).json({ message: "All field are required" });
    }
    const newCoupon = new Coupon({
      code,
      discountValue,
      minOrderAmount,
      expirationDate,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true,
    });

    const savedCoupon = await newCoupon.save();
    res.status(201).json({
      message: "Coupon created successfully",
      coupon: savedCoupon,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }
    res
      .status(500)
      .json({ message: "Internal Server error", error: error.message });
  }
};

const updateCoupon = async (req, res) => {
  try {
    const { discountValue, minOrderAmount, expirationDate, isActive } =
      req.body;
    const { couponId } = req.params;
    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
      return res.status(404).json({ message: "coupon not found" });
    }
    if (discountValue) coupon.discountValue = discountValue;
    if (minOrderAmount) coupon.minOrderAmount = minOrderAmount;
    if (expirationDate) coupon.expirationDate = expirationDate;
    if (isActive) coupon.isActive = isActive;

    const UpdatedCoupon = await coupon.save();
    return res
      .status(200)
      .json({ message: "coupon updated successfully", UpdatedCoupon });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error", error: error.message });
  }
};

const applyCoupon = async (totalAmount, couponId) => {
  if (!couponId) return totalAmount;
  const coupon = await Coupon.findById(couponId);
  if (!coupon) throw new Error("coupon not found");
  if (!coupon.isActive) throw new Error("Coupon is inactive");
  if (coupon.expirationDate < new Date()) throw new Error("coupon expired");
  if (totalAmount < coupon.minOrderAmount)
    throw new Error(`order is lessthan ${coupon.minOrderAmount}`);
  const discount = totalAmount - coupon.discountValue;
  return discount;
};

module.exports = { addCoupon, updateCoupon, applyCoupon };
