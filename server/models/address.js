const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
  housename: {
    type: String,
    required: true,
    trim: true,
  },
  street: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  pincode: {
    type: String,
    required: true,
    trim: true,
    match: /^[1-9][0-9]{5}$/,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
