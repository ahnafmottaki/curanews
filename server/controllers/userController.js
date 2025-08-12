const { ObjectId } = require("mongodb");
const db = require("../database/mongodb.init.js");
const articleCollection = db.collection("articles");
const AppError = require("../utils/AppError.js");
const asyncHandler = require("../utils/asyncHandler.js");

const userCollection = db.collection("users");

exports.getUserStatistics = asyncHandler(async (req, res) => {
  const totalUsers = await userCollection.countDocuments();
  const premiumUsers = await userCollection.countDocuments({
    premiumTaken: { $ne: null },
  });
  const normalUsers = await userCollection.countDocuments({
    premiumTaken: null,
  });

  res.json({
    totalUsers,
    premiumUsers,
    normalUsers,
  });
});

exports.putUpdateProfile = asyncHandler(async (req, res, next) => {
  const uid = req.query.uid;
  const { name } = req.body;
  if (!name) {
    return next(new AppError("Invalid name", 404));
  }
  const response = await articleCollection.updateOne(
    { uid },
    {
      $set: {
        name,
      },
    }
  );
  if (response.modifiedCount === 0) {
    return next(new AppError("failed to update user", 500));
  }
  await articleCollection.updateMany(
    { authorUid: uid },
    {
      $set: {
        authorName: name,
      },
    }
  );

  res.send({
    success: true,
    message: "user updated successfully",
  });
});

exports.getIsPremiumOver = asyncHandler(async (req, res, next) => {
  const uid = req.query.uid;
  const user = await userCollection.findOne({ uid });
  if (!user) {
    return next(new AppError("User doesn't exists"));
  }
  if (!user.premiumTaken) {
    return res.send({
      success: true,
      message: "User didn't take premium",
    });
  }
  if (Date.now() > user.premiumTaken) {
    await userCollection.updateOne(
      { uid },
      {
        $set: {
          premiumTaken: null,
        },
      }
    );
    return res.send({
      success: true,
      isSubscriptionOver: true,
    });
  }
  res.send({
    success: true,
    isSubscriptionOver: false,
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const uid = req.query.uid;
  const user = await userCollection.findOne({ uid });
  if (!user) {
    return next(new AppError("User doesn't exits"));
  }
  res.send(user);
});

exports.putMakeAdmin = asyncHandler(async (req, res, next) => {
  const userId = req.query.id;
  if (!userId || !ObjectId.isValid(userId)) {
    return next(new AppError("Invalid User Id", 404));
  }
  const makeAdminResponse = await userCollection.updateOne(
    {
      _id: new ObjectId(userId),
    },
    {
      $set: {
        role: "admin",
      },
    }
  );
  if (makeAdminResponse.modifiedCount === 0) {
    return next(new AppError("No user found!", 404));
  }
  res.send({
    success: true,
    message: "Make Admin Successful",
  });
});

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {
    uid: { $ne: req.decoded.uid },
  };

  const [users, total] = await Promise.all([
    userCollection
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray(),
    userCollection.countDocuments(filter),
  ]);

  res.send({
    users,
    total,
    page,
    limit,
  });
});

exports.postAddUser = asyncHandler(async (req, res, next) => {
  const userExists = await userCollection.findOne({ uid: req.decoded.uid });

  if (userExists) {
    return res.send({
      success: false,
      message: "User not found",
    });
  }
  const userCredentials = {
    uid: req.decoded.uid,
    name: req.decoded.name,
    email: req.decoded.email,
    profileImg: req.decoded.picture || req.decoded.profile,
    role: "user",
    premiumTaken: null,
    createdAt: Date.now(),
    lastLoginAt: Date.now(),
  };
  const response = await userCollection.insertOne(userCredentials);
  if (response.insertedId === 0) {
    next(new AppError("Failed to add user", 500));
  }
  res.status(201).json({
    success: true,
    data: {
      message: "User created successfully",
    },
  });
});

exports.getIsAdmin = asyncHandler(async (req, res, next) => {
  const uid = req.decoded.uid;
  const userRecord = await userCollection.findOne({ uid });
  res.send({
    isAdmin: userRecord?.role ? userRecord.role === "admin" : false,
  });
});

exports.getPremiumTaken = asyncHandler(async (req, res, next) => {
  const uid = req.decoded.uid;
  const userRecord = await userCollection.findOne({
    uid,
  });
  if (!userRecord) {
    return next(new AppError("No Users Found", 404));
  }
  res.send({
    isPremiumTaken: userRecord.premiumTaken ? true : false,
  });
});
