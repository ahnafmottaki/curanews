const AppError = require("../utils/AppError.js");
const asyncHandler = require("../utils/asyncHandler.js");

const admin = require("firebase-admin");
const verifyFBToken = asyncHandler(async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) next(new AppError("Authorization Token Required", 401));
  const decoded = await admin.auth().verifyIdToken(token);
  if (!decoded) next(new AppError("Invalid Token", 401));
  req.decoded = decoded;
  next();
});

module.exports = verifyFBToken;
