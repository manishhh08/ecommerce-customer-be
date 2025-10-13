import { MongoClient } from "mongodb";
import config from "./config.js";

let db;

const mongoConnect = async () => {
  if (db) return db;

  try {
    const client = new MongoClient(config.mongoOptions.url);
    await client.connect();

    console.log("✅ Connected to MongoDB");

    db = client.db();
    return db;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
};

export const getDB = () => {
  if (!db)
    throw new Error("Database not connected. Call mongoConnect() first.");
  return db;
};

export default mongoConnect;
