import dotenv from "dotenv";

dotenv.config();
const config = {
  salt: +process.env.SALT || 10,
  port: process.env.PORT || 5050,
  mongoOptions: {
    url: process.env.MONGODB_URL || "mongodb://localhost:27017/ecommerce-admin",
  },

  jwt: {
    secret: process.env.JWT_SECRET || "secret",
    expiresin: process.env.EXPIRES_IN || "7d",
    refresh_secret: process.env.JWT_REFRESH_SECRET || "REFRESH-SECRET_KEY",
    refresh_expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
  },
};

export default config;
