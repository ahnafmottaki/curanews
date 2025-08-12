const express = require("express");
// const adminController = require("../controllers/adminController.js");
const articleController = require("../controllers/articleController.js");
const userController = require("../controllers/userController.js");
const adminController = require("../controllers/adminController.js");
const router = express.Router();

router.get("/allArticles", articleController.getAllArticles);

router.get("/users", userController.getAllUsers);

router.post("/addPublisher", articleController.postAddPublisher);

router.put("/status", articleController.putUpdateStatus);

router.put("/premium", articleController.putMakePremium);

router.put("/makeAdmin", userController.putMakeAdmin);

router.delete("/article", articleController.deleteArticle);

router.get(
  "/publisher-article-stats",
  adminController.getPublisherArticleStats
);

router.get("/premium-status-stats", adminController.getPremiumAndStatusStats);

module.exports = router;
