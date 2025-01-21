const User = require("../models/user");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/token");
const userSignup = async (req, res) => {
  try {
    const { name, email, password, mobile, role } = req.body;
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ message: "All fields required" });
    }
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message: "User all ready existed" });
    }
    console.log(role);
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
      role: role ? role : "user",
    });

    await newUser.save();

    const token = generateToken(newUser);

    res.cookie("token", token);

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPassMatch = bcrypt.compareSync(password, userExist.password);

    if (!isPassMatch) {
      return res.status(400).json({ message: "user is not authenticated" });
    }

    const token = generateToken(userExist);

    res.cookie("token", token);

    res.status(200).json({ message: "User login successfully" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    // Validate input fields
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Fetch the authenticated user (assuming userId is available in req.user)
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isPassMatch = bcrypt.compareSync(currentPassword, user.password);
    if (!isPassMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash the new password
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Respond to the client
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

const userProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const userProfile = await User.findById(userId).select("-password");
    res
      .status(200)
      .json({ message: "User login successfully", data: userProfile });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

const userUpdateprofile = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
    const userId = req.user.id;

    const profile = await User.findById(userId).select("-password");
    if (!profile) {
      return res.status(404).json({ message: "User is not found" });
    }
    if (name) profile.name = name;
    if (email) profile.email = email;
    if (mobile) profile.mobile = mobile;
    const profileupdated = await profile.save();
    res.status(200).json({
      message: "User profile updated successfully",
      profileupdated,
    });
  } catch (error) {
    console.error("error updating profile", error);
    res.status(500).json({ message: "Internal server  error" });
  }
};

const userLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(201).json({ message: "user logout" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const removeUser = await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User delete successfully" });
  } catch (error) {
    console.error("error deleting user", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const checkUser = async (req, res) => {
  try {
    const { userEmail } = req.query;
    const userExist = await User.findOne({ email: userEmail });
    if (!userExist) {
      return res.status(400).json({ message: "User does not exist" });
    }
    return res.status(200).json({ userRole: userExist.role });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
module.exports = {
  userSignup,
  userLogin,
  checkUser,
  changePassword,
  userProfile,
  userUpdateprofile,
  userLogout,
  deleteUser,
};
