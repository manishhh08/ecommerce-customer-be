import mongoose from "mongoose";
import config from "./config.js";

export default () => {
  return mongoose.connect(config.mongoOptions.url);
};
