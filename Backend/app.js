// ! Node modules import
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

// ! Dependency file imports
const errorHandler = require("./middlewares/errorHandler");
const movieRouter = require("./routes/movie");
const userRouter = require("./routes/user");
const actorRouter = require("./routes/actor");
const reviewRouter = require("./routes/review");
// ! Global variables
const publicPath = "./public";

// ! Express app initialization and pre-built middlewares
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(fileUpload());
app.use(express.static("public"));

// CORS
app.use(cors());

// Sanitize data
app.use(mongoSanitize());

// Prevent XSS attact
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 mins
  max: 100,
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Use helmet
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  app.use(morgan("dev"));
} else {
  // create a write stream (in append mode)
  let accessLogStream = fs.createWriteStream("./access.log", {
    flags: "a",
  });

  // setup the logger
  app.use(morgan("combined", { stream: accessLogStream }));
}

// * Check if public directory exists, if not then generate the directories
if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath);
  fs.mkdirSync(publicPath + "/images");
  fs.mkdirSync(publicPath + "/images/users");
  fs.mkdirSync(publicPath + "/images/banner");
  fs.mkdirSync(publicPath + "/images/thumbnail");
  fs.mkdirSync(publicPath + "/images/actor");
}

// ! Routers initialization
app.use("/movie", movieRouter);
app.use("/user", userRouter);
app.use("/actor", actorRouter);
app.use("/review", reviewRouter);

// ! Error handler & Got lost handler
app.all("*", async (req, res, next) => {
  try {
    next({ message: "Not found. Are you lost?", status: 404 });
  } catch (err) {
    next(err);
  }
});
app.use(errorHandler);

// ! Listens on port specified
if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT, () =>
    console.log(`App is running on port ${process.env.PORT}`)
  );
}

module.exports = app;
