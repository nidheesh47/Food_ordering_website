const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true, minLength: 10 },
  cuisine: { type: String },
  image: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }], // Reference to MenuItem model
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
