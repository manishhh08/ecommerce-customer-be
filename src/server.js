import express from "express";
import cors from "cors";
import mongoConnect from "./config/mongoConfig.js";
import config from "./config/config.js";
import authRouter from "./routes/authRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("I am alive");
});

// auth router
app.use("/api/v1/auth", authRouter);

mongoConnect()
  .then(() => {
    app.listen(config.port, (err) => {
      if (err) {
        console.log("SERVER COULD NOT START");
      } else {
        console.log("Server started at port", config.port);
      }
    });
  })
  .catch((err) => {
    console.log(err.message);
    console.log("MONGO DB CONNECTION ERROR");
  });
