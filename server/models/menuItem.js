const mongoose = require("mongoose");
const Review = require("./review");

const menuItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"], // If title is used instead of name
  },
  description: String,
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  image: String,
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  review: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  rating: { type: Number, default: 0 },
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = MenuItem;
