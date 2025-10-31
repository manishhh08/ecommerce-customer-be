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
- Help customers connect, create, and enjoy technology in their everyday lives.`;

export const chatAI = async (message) => {
  try {
    const msg = message.toLowerCase().trim();
    let userEnquiry = "";
    let contextType = "";
    let products = [];

    if (
      msg.includes("about you") ||
      msg.includes("about electrahub") ||
      msg.includes("who are you")
    ) {
      userEnquiry = aboutUs;
      contextType = "about" || "who";
    } else if (
      /(product|category|subcategory|show|find|list|available|buy|have|sell|want|looking|search|get|offer|do|is)/i.test(
        msg
      )
    ) {
      const keyword = msg
        .replace(
          /\b(show|find|list|available|buy|retrieve|category|subcategory|products?|me|some|all|please|of|with|price|have|sell|want|looking|search|get|offer|do|is|you|there|any|a|an|the|for|that|which|like)\b/gi,
          ""
        )
        .trim();
      console.log("Extracted keyword:", keyword);

      if (!keyword) {
        userEnquiry = "Please specify which product you're looking for.";
      } else {
        const wordRegex = new RegExp(`\\b${keyword}\\b`, "i");

        const filters = {
          status: "active",
          $or: [
            { "category.name": { $regex: wordRegex } },
            { "subcategory.name": { $regex: wordRegex } },
            { name: { $regex: wordRegex } },
            { description: { $regex: wordRegex } },
          ],
        };

        products = await getProductsByFilter(filters);

        if (products?.length > 0) {
          userEnquiry = `Here are some ${
            keyword || "available"
          } products we found:`;
          contextType = "products";
        } else {
          userEnquiry = `Sorry, we couldn't find any products related to "${keyword}".`;
        }
      }
    }
    const prompt = `You are a helpful assistant for our business. Here is our data: ${userEnquiry}
    Answer the user's question based only on this data.
    ${
      contextType === "products"
        ? "Product Data:\n" + userEnquiry
        : contextType === "about"
        ? "About Info:\n" + userEnquiry
        : "If user asks about our products or services, respond accordingly based on company info."
    }
    
    Question: ${message}
    Answer using only with the data provided. If the answer is not in the data, respond with 'I'm sorry, I don't have that information at the moment.'`;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [prompt],
    });
    const responseText = result.candidates[0].content.parts
      .map((p) => p.text)
      .join("");
    console.log("Response:", responseText);

    return { text: responseText, products };
  } catch (error) {
    console.error("Chat AI Error:", error);
    throw error;
  }
};
