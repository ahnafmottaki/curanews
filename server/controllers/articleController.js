const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const db = require("../database/mongodb.init.js");
const { ObjectId } = require("mongodb");
const articleCollection = db.collection("articles");
const publisherCollection = db.collection("publishers");
const userCollection = db.collection("users");

exports.getTrendingArticles = asyncHandler(async (req, res, next) => {
  const trendingArticles = await articleCollection
    .find({ status: "approved" })
    .sort({ viewCount: -1, createdAt: -1 })
    .limit(10)
    .project({ title: 1, imageURL: 1, publisher: 1, viewCount: 1 })
    .toArray();

  res.status(200).json({ success: true, data: trendingArticles });
});

exports.getArticlesByAuthorUid = asyncHandler(async (req, res, next) => {
  const uid = req.query.uid;
  if (!uid) {
    return next(new AppError("Invalid uid Parameters"));
  }
  const articles = await articleCollection
    .find({ authorUid: uid })
    .sort({
      createdAt: -1,
    })
    .toArray();
  res.send(articles);
});

exports.getPremiumArticles = asyncHandler(async (req, res, next) => {
  const premiumArticles = await articleCollection
    .find({
      isPremium: true,
      status: "approved",
    })
    .toArray();
  res.send(premiumArticles);
});

exports.getArticleById = asyncHandler(async (req, res, next) => {
  const articleId = req.params.articleId;
  if (!articleId || !ObjectId.isValid(articleId)) {
    return next(new AppError("Invalid Article Id"));
  }
  const article = await articleCollection.findOneAndUpdate(
    {
      _id: new ObjectId(articleId),
    },
    {
      $inc: {
        viewCount: 1,
      },
    },
    {
      returnDocument: "after",
    }
  );
  if (!article) {
    return next(new AppError("Article doesn't exits"));
  }
  res.send(article);
});

exports.getPublisher = asyncHandler(async (req, res, next) => {
  const publishers = await publisherCollection.find({}).toArray();
  res.send(publishers);
});

exports.postAddPublisher = asyncHandler(async (req, res, next) => {
  const publisherDetails = req.body;
  if (!publisherDetails) {
    return next(new AppError("Publisher Details required", 404));
  }

  const insertResponse = await publisherCollection.insertOne(publisherDetails);
  if (!insertResponse.insertedId) {
    return next(new AppError("Failed to Add Publisher", 503));
  }
  res.status(201).json({
    success: true,
    message: "Publisher Added Successfully",
  });
});

exports.postAddArticle = asyncHandler(async (req, res, next) => {
  let { articleId, ...articleDetails } = req.body;
  const userUid = req.query.uid;
  if (Object.keys(articleDetails).length === 0) {
    return next(new AppError("Article Details Required", 404));
  }

  if (!articleId) {
    const userRecord = await userCollection.findOne({ uid: userUid });
    if (!userRecord) {
      return next(new AppError("User doesn't exists"));
    }
    if (!userRecord.premiumTaken) {
      const ownedArticles = await articleCollection.countDocuments({
        authorUid: userUid,
      });
      if (ownedArticles >= 1) {
        return res.send({
          success: true,
          isArticleLimitReached: true,
        });
      }
    }

    articleDetails = {
      ...articleDetails,
      authorName: req.decoded.name,
      authorEmail: req.decoded.email,
      authorImg: req.decoded.profile || req.decoded.picture,
      authorUid: userUid,
      isPremium: false,
      status: "pending",
      viewCount: 0,
      declinedReason: null,
      createdAt: Date.now(),
    };
  }

  let method = "insertOne";
  let searchOptions = [articleDetails];
  if (articleId) {
    if (!ObjectId.isValid(articleId)) {
      return next(new AppError("Invalid Article Id"));
    }
    method = "updateOne";
    searchOptions = [
      { _id: new ObjectId(articleId) },
      {
        $set: articleDetails,
      },
    ];
  }

  const result = await articleCollection[method](...searchOptions);
  if (!articleId && !result.insertedId) {
    return next(new AppError("Failed to add article"));
  }
  if (articleId && result.modifiedCount === 0) {
    return next(new AppError("Failed to update Article"));
  }
  res.status(201).json({
    success: true,
    data: {
      message: articleId ? "Article Updated Successfully" : "Article added",
    },
  });
});

exports.deleteArticle = asyncHandler(async (req, res, next) => {
  const { id } = req.query;
  if (!id || !ObjectId.isValid(id)) {
    return next(new AppError("Invalid Id parameters", 404));
  }
  const deleteResponse = await articleCollection.deleteOne({
    _id: new ObjectId(id),
  });
  if (deleteResponse.deletedCount == 0) {
    return next(new AppError("Article not Found ", 404));
  }
  res.send({
    success: true,
    message: "Article Delete Successful",
  });
});

exports.getAllArticles = asyncHandler(async (req, res, next) => {
  const { search, publisher, tag, page = 1, limit = 10 } = req.query;

  const query = {};

  const isPublic = !req.decoded;

  if (isPublic) {
    query.status = "approved";
  }

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  if (publisher) {
    query.publisher = publisher;
  }

  if (tag) {
    query.tags = { $in: [tag] };
  }

  if (isPublic) {
    const projection = {
      _id: 1,
      isPremium: 1,
      imageURL: 1,
      title: 1,
      publisher: 1,
      description: 1,
      tags: 1,
    };

    const articles = await articleCollection
      .find(query, { projection })
      .sort({ createdAt: -1 })
      .toArray();

    return res.json(articles);
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [articles, total] = await Promise.all([
    articleCollection
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .toArray(),
    articleCollection.countDocuments(query),
  ]);

  res.send({
    articles,
    total,
    page: Number(page),
    limit: Number(limit),
  });
});

exports.putUpdateStatus = asyncHandler(async (req, res, next) => {
  const { status, id, declinedReason } = req.query;
  if (!["approved", "declined"].includes(status) || !ObjectId.isValid(id)) {
    return next(new AppError("Invalid Query Parameters", 400));
  }

  if (status === "declined" && !declinedReason) {
    return next(new AppError("Declined Reason isn't Provided", 400));
  }

  const statusUpdateResponse = await articleCollection.updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: {
        status: status,
        declinedReason: status === "declined" ? declinedReason : null,
      },
    }
  );

  if (statusUpdateResponse.modifiedCount === 0) {
    return next(new AppError("Invalid Article Id", 400));
  }

  res.send({
    success: true,
    message: "Status Update Successful",
  });
});

exports.putMakePremium = asyncHandler(async (req, res, next) => {
  const { id } = req.query;
  if (!id || !ObjectId.isValid(id)) {
    return next(new AppError("Invalid Id Parameters", 404));
  }
  const premiumResponse = await articleCollection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        isPremium: true,
      },
    }
  );

  if (premiumResponse.modifiedCount === 0) {
    return next(new AppError("Invalid Article Id", 404));
  }
  res.status(201).json({
    success: true,
    message: "Article is now Premium",
  });
});
