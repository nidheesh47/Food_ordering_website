const adminRole = async (req, res, next) => {
  const role = req.user.role;
  if (role !== "admin") {
    return res
      .status(400)
      .json({ message: "Admin access required to perform this action" });
  }
  next();
};

module.exports = adminRole;
