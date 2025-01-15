const mongoose = require("mongoose");
const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      maxLength: 20,
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },
    minOrderAmount: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
// Check expiration before saving
couponSchema.pre("save", function (next) {
  if (this.expirationDate < new Date()) {
    this.isActive = false; // Set the coupon as inactive if expired
  }
  next();
});

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
