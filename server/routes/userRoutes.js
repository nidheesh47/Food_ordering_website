const express = require("express");
const {
  userSignup,
  userLogin,
  checkUser,
  changePassword,
  userProfile,
  userLogout,
  userUpdateprofile,
  deleteUser,
} = require("../controllers/userController");

const authenticateToken = require("../middleware/auth");
const userAuth = require("../middleware/auth");
const upload = require("../middleware/multer");
const router = express.Router();
router.post("/signup", userSignup);
router.get("/check-user", checkUser);
router.post("/login", userLogin);
router.put("/change-password", userAuth, changePassword);
router.post("/logout", userAuth, userLogout);
router.get("/profile", userAuth, userProfile);
router.put(
  "/profile/update",
  userAuth,
  upload.single("profilePic"),
  userUpdateprofile
);
router.delete("/:userId", userAuth, deleteUser);

const userRouter = router;

module.exports = userRouter;
