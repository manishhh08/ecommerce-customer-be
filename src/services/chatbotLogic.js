import { GoogleGenAI } from "@google/genai";
import { getProductsByFilter } from "../models/products/productModel.js";
import config from "../config/config.js";

const ai = new GoogleGenAI({ apiKey: config.chatbot.apikey });

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

export const chatAI = async (message) => {
  let userEnquiry;
  const products = await getProductsByFilter({ status: "active" });

  if (message.toLowerCase().includes("product")) {
    userEnquiry = products.map((p) => `${p.name}: $${p.price}`).join("\n");
  }
  if (message.toLowerCase().includes("about you")) userEnquiry = aboutUs;
  const prompt = `You are a helpful assistant for our business. Here is our data: ${userEnquiry}
  Answer the user's question based only on this data.
  Question: ${message}`;
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [prompt],
    });
    const responseText = result.candidates[0].content.parts
      .map((p) => p.text)
      .join("");
    console.log("Response:", responseText);

    return responseText;
  } catch (err) {
    throw err;
  }
};
