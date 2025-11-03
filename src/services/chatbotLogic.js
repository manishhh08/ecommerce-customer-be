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

const greetingResponse = `Hello! 👋 How can I help you today?`;

export const chatAI = async (message) => {
  try {
    const msg = message.toLowerCase();
    let userEnquiry = "";
    let contextType = "";
    let products = [];

    if (
      msg.includes("about you") ||
      msg.includes("about electrahub") ||
      msg.includes("tell me about electrahub") ||
      msg.includes("what is electrahub") ||
      msg.includes("who are you")
    ) {
      userEnquiry = aboutUs;
      contextType = "about";
    } else if (/(hello|hi|hey)/i.test(msg)) {
      userEnquiry = greetingResponse;
    } else if (
      /(product|category|subcategory|show|find|list|available|buy|have|sell|want|looking|search|get|offer|do|is)/i.test(
        msg
      )
    ) {
      const checkKeyword = [
        "find",
        "show",
        "me",
        "want",
        "to",
        "buy",
        "get",
        "search",
        "for",
        "a",
        "an",
        "the",
        "please",
        "some",
        "need",
        "looking",
        "i",
        "is",
        "do",
        "there",
        "offer",
        "have",
        "sell",
        "available",
        "you",
        "product",
        "products",
      ];
      const priceFilter = msg.match(/\d+(\.\d+)?/g)?.map(Number) || [];

      let priceCondition = {};

      if (priceFilter.length === 1) {
        if (/(under|below|less than|cheaper than|max)/i.test(msg)) {
          priceCondition = { price: { $lte: priceFilter[0] } };
        } else if (/(above|more than|greater than)/i.test(msg)) {
          priceCondition = { price: { $gte: priceFilter[0] } };
        } else {
          priceCondition = { price: { $lte: priceFilter[0] } };
        }
      } else if (priceFilter.length === 2) {
        // two numbers: treat as range
        const min = Math.min(priceFilter[0], priceFilter[1]);
        const max = Math.max(priceFilter[0], priceFilter[1]);
        priceCondition = { price: { $gte: min, $lte: max } };
      }

      const words = msg.split(/\s+/);
      const keywords = words.filter((word) => !checkKeyword.includes(word));

      if (keywords.length === 0) {
        userEnquiry = "Please specify which product you're looking for.";
      } else {
        const regexArray = keywords.map(
          (word) =>
            new RegExp(
              `\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(s)?\\b`,
              "i"
            )
        );

        const filter = {
          $and: [
            {
              $or: [
                { name: { $in: regexArray } },
                { category: { $in: regexArray } },
                { subcategory: { $in: regexArray } },
              ],
            },
            priceCondition,
          ],
        };

        products = await getProductsByFilter(filter, {}, 20);

        if (products?.length === 0) {
          userEnquiry = `Sorry, we couldn't find any products related to "${keywords.join(
            " "
          )}".`;
        } else {
          const productList = products
            .map((p) => `${p.name}${p.price ? ` - $${p.price}` : ""}`)
            .join("\n");

          userEnquiry = `Here are some products we found related to "${keywords.join(
            " "
          )}":\n${productList}`;
          contextType = "products";
        }
      }
    } else {
      userEnquiry =
        "I'm not sure I understood that. Could you rephrase your question?";
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

    const responseText =
      result?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ||
      "I'm sorry, I don't have that information at the moment.";

    console.log("Response:", responseText);

    return { text: responseText, products };
  } catch (error) {
    console.error("Chat AI Error:", error);
    throw error;
  }
};
