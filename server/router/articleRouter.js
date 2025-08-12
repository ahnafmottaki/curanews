const express = require("express");
const articleController = require("../controllers/articleController.js");
const verifyFBToken = require("../utils/verifyFBToken.js");
const verifyUser = require("../utils/verifyUser.js");
const router = express.Router();

router.get("/articles/trending", articleController.getTrendingArticles);

router.post(
  "/article",
  verifyFBToken,
  verifyUser,
  articleController.postAddArticle
);
router.get("/publishers", articleController.getPublisher);
router.get("/articles", articleController.getAllArticles);
router.get(
  "/articleDetail/:articleId",
  verifyFBToken,
  verifyUser,
  articleController.getArticleById
);

router.get(
  "/premiumArticles",
  verifyFBToken,
  articleController.getPremiumArticles
);

router.get(
  "/articles/user",
  verifyFBToken,
  verifyUser,
  articleController.getArticlesByAuthorUid
);

router.delete(
  "/article",
  verifyFBToken,
  verifyUser,
  articleController.deleteArticle
);

module.exports = router;
