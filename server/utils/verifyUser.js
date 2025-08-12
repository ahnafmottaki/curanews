const AppError = require("./AppError");
const asyncHandler = require("./asyncHandler");

const verifyUser = asyncHandler(async (req, res, next) => {
  const uid = req.query.uid;
  if (!uid || req.decoded.uid !== uid) {
    return next(new AppError("Forbidden", 403));
  }
  next();
});
module.exports = verifyUser;
