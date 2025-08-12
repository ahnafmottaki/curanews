const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const db = require("../database/mongodb.init.js");
const historyCollection = db.collection("history");
const userCollection = db.collection("users");

exports.postPaymentIntent = asyncHandler(async (req, res) => {
  const { amount, currency } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // in cents
      currency,
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe Payment Intent Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

exports.postAddPaymentHistory = asyncHandler(async (req, res, next) => {
  const historyDetails = req.body;
  const uid = req.query.uid;
  if (Object.keys(historyDetails).length !== 7) {
    return next(new AppError("History Details Compromised", 404));
  }
  const userPremiumResponse = await userCollection.updateOne(
    { uid },
    {
      $set: {
        premiumTaken: Date.now() + historyDetails.subscriptionDuration,
      },
    }
  );
  if (userPremiumResponse.modifiedCount === 0) {
    return next(new AppError("Invalid Uid parameters"));
  }
  const response = await historyCollection.insertOne(historyDetails);
  if (!response.insertedId) {
    return next(new AppError("Failed to add history in database"));
  }
  res.send({
    success: true,
    message: "History added successfully",
  });
});
