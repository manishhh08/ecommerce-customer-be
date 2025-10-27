import { MongoClient } from "mongodb";
import config from "./config.js";
import mongoose from "mongoose";
//for mongo native drive to read data from db
let db;

export const mongoConnect = async () => {
  if (db) return db;

  try {
    const client = new MongoClient(config.mongoOptions.url);
    await client.connect();

    console.log("Connected to MongoDB");

    db = client.db();
    return db;
  } catch (err) {
    console.error(" MongoDB connection error:", err);
    throw err;
  }
};

export const getDB = () => {
  if (!db)
    throw new Error("Database not connected. Call mongoConnect() first.");
  return db;
};

//for mongoose to create and login user
export const mongooseConnect = async () => {
  return mongoose.connect(config.mongoOptions.url);
};
