const asyncHandler = require("../utils/asyncHandler.js");
const db = require("../database/mongodb.init.js");
const articleCollection = db.collection("articles");

exports.getPublisherArticleStats = asyncHandler(async (req, res, next) => {
  const stats = await articleCollection
    .aggregate([
      {
        $group: {
          _id: "$publisher",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ])
    .toArray();

  res.status(200).json({ success: true, data: stats });
});

// Route: GET /dashboard/premium-status-stats
exports.getPremiumAndStatusStats = asyncHandler(async (req, res, next) => {
  const premiumStats = await articleCollection
    .aggregate([
      {
        $group: {
          _id: "$isPremium",
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();

  const statusStats = await articleCollection
    .aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ])
    .toArray();

  res.status(200).json({
    success: true,
    data: {
      premiumStats,
      statusStats,
    },
  });
});
