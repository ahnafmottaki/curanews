const express = require("express");
const cors = require("cors");
const app = express();
// other imports
const initializeFirebase = require("./firebase/firebase.config.js");
// * routers
const userRouter = require("./router/userRouter.js");
const adminRouter = require("./router/adminRouter.js");
const articleRouter = require("./router/articleRouter.js");
const stripeRouter = require("./router/stripeRouter.js");
// * middlewares
const errorMiddleware = require("./middlewares/errorMiddleware.js");
const PageNotFoundMiddleware = require("./middlewares/PageNotFoundMiddleware.js");

// * utils
const verifyFBToken = require("./utils/verifyFBToken.js");
const verifyAdmin = require("./utils/verifyAdmin.js");

// * firebase initialization
initializeFirebase();

// * express middlewares
app.use(cors());
app.use(express.json());

// testing route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Health check successful",
  });
});

// * routers
// => User Router
app.use(stripeRouter);
app.use("/admin", verifyFBToken, verifyAdmin, adminRouter);
app.use(userRouter);
app.use(articleRouter);

// not found middleware
app.use(PageNotFoundMiddleware);

// error middleware
app.use(errorMiddleware);

module.exports = app;
