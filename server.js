import express from "express";
import cors from "cors";
import { mongoConnect, mongooseConnect } from "./src/config/mongoConfig.js";
import config from "./src/config/config.js";
import authRouter from "./src/routes/authRouter.js";
import customerRouter from "./src/routes/customerRouter.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";
import categoryRouter from "./src/routes/categoryRouter.js";
<<<<<<< HEAD
import orderRouter from "./src/routes/orderRouter.js";
=======
import productRouter from "./src/routes/productRouter.js";
>>>>>>> 78bb6c48fb9400efc3274000bda29e815df63de7

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("I am Customer Front End");
});

// auth router
app.use("/api/v1/auth", authRouter);

//user routes
app.use("/api/v1/customer", customerRouter);

//stripe route
app.use("/api/v1/payment", paymentRoutes);
//category router
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/order", orderRouter);

// Product router
app.use("/api/v1/products", productRouter);

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
