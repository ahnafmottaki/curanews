const express = require("express");
const userController = require("../controllers/userController.js");
const verifyFBToken = require("../utils/verifyFBToken.js");
const verifyUser = require("../utils/verifyUser.js");
const router = express.Router();

router.get("/users/statistics", userController.getUserStatistics);
router.post("/user", verifyFBToken, userController.postAddUser);
router.get("/user", verifyFBToken, verifyUser, userController.getUser);
router.get("/user/isAdmin", verifyFBToken, userController.getIsAdmin);
router.get("/user/premiumTaken", verifyFBToken, userController.getPremiumTaken);
router.get(
  "/user/isPremiumOver",
  verifyFBToken,
  verifyUser,
  userController.getIsPremiumOver
);

router.put(
  "/user/updateProfile",
  verifyFBToken,
  verifyUser,
  userController.putUpdateProfile
);
module.exports = router;
