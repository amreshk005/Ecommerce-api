const express = require("express");
const morgan = require("morgan");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

//1) Middleware

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Express provides you with middleware to deal with the (incoming) data
// (object) in the body of the request. a. express.json() is a method inbuilt
// in express to recognize the incoming Request Object as a JSON Object
app.use(express.json());
// To serve static files such as images, CSS files, and JavaScript files,
// use the express.static built-in middleware function in Express. The function
// signature is: express. static(root, [options]) The root argument specifies the
// root directory from which to serve static assets.
// app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
  console.log("Hello from the middleware 😚🚀");
  next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

// if you will unvalid route you'll get this error
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 3) starts server
module.exports = app;
