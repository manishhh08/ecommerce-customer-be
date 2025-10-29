import express from "express";
import cors from "cors";
import { mongoConnect, mongooseConnect } from "./src/config/mongoConfig.js";
import config from "./src/config/config.js";
import authRouter from "./src/routes/authRouter.js";
import customerRouter from "./src/routes/customerRouter.js";
import paymentRouter from "./src/routes/paymentRouter.js";
import categoryRouter from "./src/routes/categoryRouter.js";
import orderRouter from "./src/routes/orderRouter.js";
import productRouter from "./src/routes/productRouter.js";
import chatRouter from "./src/routes/chatRouter.js";
import reviewRouter from "./src/routes/reviewRouter.js";
import subscribeRouter from "./src/routes/subscribeRouter.js";
import { createApiError } from "./src/utils/apiError.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("I am Customer Front End");
});

// auth router
app.use("/api/v1/auth", authRouter);

// user routes
app.use("/api/v1/customer", customerRouter);

// stripe route
app.use("/api/v1/payment", paymentRouter);

// category router
app.use("/api/v1/category", categoryRouter);

// order router
app.use("/api/v1/orders", orderRouter);

// Product router
app.use("/api/v1/products", productRouter);

//Review Router
app.use("/api/v1/reviews", reviewRouter);

// chatbot router
app.use("/api/v1/chat", chatRouter);

// mailchimp router
app.use("/api/v1/subscribe", subscribeRouter);

// api error handler
app.all("/^/.*$/", (req, res, next) => {
  next(createApiError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});
mongoConnect()
  .then(() => mongooseConnect())
  .then(() => {
    app.listen(config.port, (err) => {
      if (err) {
        console.log(err, "SERVER COULD NOT START");
      } else {
        console.log("Server started at port", config.port);
      }
    });
  })
  .catch((err) => {
    console.log(err.message);
    console.log("MONGO DB CONNECTION ERROR");
  });
