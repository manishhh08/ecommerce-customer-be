import { MongoClient } from "mongodb";
import config from "./config.js";

// export default ()
// => {
//   return mongoose.connect(config.mongoOptions.url);
// };

const uri = config.mongoOptions.url; // or your MongoDB Atlas connection string
const client = new MongoClient(uri);

return client.connect();
async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("myDatabase"); // name of your database
    const collection = db.collection("users"); // name of your collection

    // Example: insert a document
    const result = await collection.insertOne({ name: "John Doe", age: 25 });
    console.log("Inserted:", result.insertedId);

    // Example: find all documents
    const users = await collection.find().toArray();
    console.log("Users:", users);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  } finally {
    await client.close(); // close when done
  }
}

// connectDB();
