const userRole = async (req, res, next) => {
  const role = req.user.role;
  console.log(role);
  if (role !== "user") {
    return res
      .status(400)
      .json({ message: "User access required to perform this action" });
  }
  next();
};

module.exports = userRole;
