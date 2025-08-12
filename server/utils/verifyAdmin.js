const asyncHandler = require("./asyncHandler");
const db = require("../database/mongodb.init.js");
const AppError = require("./AppError");
const userCollection = db.collection("users");

const verifyAdmin = asyncHandler(async (req, res, next) => {
  const uid = req.decoded.uid;
  const userRecord = await userCollection.findOne({ uid });
  if (userRecord.role !== "admin") {
    return next(new AppError("Forbidden", 403));
  }

  next();
});

module.exports = verifyAdmin;
