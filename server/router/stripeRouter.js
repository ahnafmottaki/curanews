const express = require("express");
const router = express.Router();
const stripeController = require("../controllers/stripeController.js");
const verifyFBToken = require("../utils/verifyFBToken.js");
const verifyUser = require("../utils/verifyUser.js");

router.post(
  "/payment-intent",
  verifyFBToken,
  verifyUser,
  stripeController.postPaymentIntent
);

router.post(
  "/addHistory",
  verifyFBToken,
  verifyUser,
  stripeController.postAddPaymentHistory
);

module.exports = router;
