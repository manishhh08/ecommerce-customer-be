import { GoogleGenAI } from "@google/genai";

import config from "../config/config.js";

const ai = new GoogleGenAI({ apiKey: config.chatbot.apikey });

export const chatResponse = async (req, res) => {
  const { message } = req.body;
  console.log("message:", message);
  console.log("apikey", config.chatbot.apikey);

  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Message cannot be empty" });
  }

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: message,
    });
    const responseText = result.candidates[0].content.parts
      .map((p) => p.text)
      .join("");
    console.log("Response:", responseText);

    return;

    res.json({ output: reply });
  } catch (err) {
    console.error("Gemini chatbot error:", err.message);
    res.status(500).json({ error: "Chatbot request failed" });
  }
};
