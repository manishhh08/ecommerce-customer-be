import { getProductsByFilter } from "../models/products/productModel.js";
import { getAllCategories } from "../models/categories/categoryModel.js";

const products = await getProductsByFilter({ status: "active" });

const aboutUs = `Electrahub is an electronics retailer based in Sydney, Australia.
We sell a wide range of products including:
- Laptops, desktops, and computer accessories
- Smartphones, tablets, and wearable devices
- Headphones, speakers, and audio equipment
- Smart home devices and gaming consoles
- Chargers, cables, and electronic accessories

Our services:
- Fast and reliable delivery within Sydney
- Expert customer support for product guidance
- Competitive prices and regular promotions

Company mission:
- Make technology accessible and enjoyable for everyone
- Help customers connect, create, and enjoy technology in their everyday lives`;

const prompt = `You are a helpful assistant for our business. Here is our data: ${businessData}
Answer the user's question based only on this data.
Question: ${userMessage}`;

export const chatAI = (message) => {
  let userEnquiry = "";
};

//product question

//about us question

//categories question
