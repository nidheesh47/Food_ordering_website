const Address = require("../models/address");
const User = require("../models/user");

const addAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    const role = req.user.role;
    if (!user || role !== "user") {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    const { housename, street, city, state, pincode } = req.body;
    if (!housename || !street || !city || !state || !pincode) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const addressExist = await Address.findOne({ housename, user: userId });
    if (addressExist) {
      return res.status(400).json({ message: "Address already exists" });
    }
    const newAddress = new Address({
      housename,
      street,
      city,
      state,
      pincode,
      user: userId,
    });
    const saveAddress = await newAddress.save();
    res
      .status(201)
      .json({ message: "Address created successfully", address: saveAddress });
  } catch (error) {
    console.error("Error in creating address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editeAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const role = req.user.role;
    if (!user || role !== "user") {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    const { housename, street, city, state, pincode } = req.body;
    const { addressId } = req.params;
    if (!addressId) {
      return res.status(400).json({ message: "Address Id is required" });
    }
    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json({ message: "Address item not found" });
    }
    if (housename) address.housename = housename;
    if (street) address.street = street;
    if (city) address.city = city;
    if (state) address.state = state;
    if (pincode) address.pincode = pincode;

    const editedAddress = await address.save();
    res.status(200).json({
      message: "Address updated successfully",
      address: editedAddress,
    });
  } catch (error) {
    console.error("Error updating address", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    if (!addressId) {
      return res.status(400).json({ message: "address Id is not found" });
    }
    const findAddress = await Address.findById(addressId).populate("user");
    if (!findAddress) {
      return res.status(404).json({ message: "address is not found" });
    }
    res
      .status(200)
      .json({ message: "successfully fetched address", findAddress });
  } catch (error) {
    console.error("Error fetching address", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAddresses = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ message: "user Id is not found" });
    }
    const address = await Address.find({ user: userId }).populate("user");
    if (!address) {
      return res.status(404).json({ message: "address is not found" });
    }
    res
      .status(200)
      .json({ message: "successfully fetched addresses", address });
  } catch (error) {
    console.error("Error fetching addresses", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const role = req.user.role;
    if (!user || role !== "user") {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    const { addressId } = req.params;
    if (!addressId) {
      return res.status(400).json({ message: "address id is required" });
    }
    const address = await Address.findByIdAndDelete(addressId);
    if (!address) {
      return res.status(404).json({ message: "address is not found " });
    }
    res.status(200).json({ message: "address item delete successfully" });
  } catch (error) {
    {
      console.error("Error deleting menu item:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports = {
  addAddress,
  editeAddress,
  getAddress,
  getAddresses,
  deleteAddress,
};
