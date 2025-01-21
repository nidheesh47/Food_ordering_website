require("dotenv").config();

const jwt = require("jsonwebtoken");
const Auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // verify the token using a strong secret key

    const tokenDecoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    if (!tokenDecoded) {
      return res.status(401).json({ message: "user is not autherized" });
    }
    req.user = tokenDecoded;
    next();
  } catch (error) {
    console.error("error verfing token", error);
    res.json(500).json({ message: "internal server error" });
  }
};

module.exports = Auth;
