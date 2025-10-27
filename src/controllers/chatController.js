import pkg from "@google-ai/generativelanguage";
import config from "../config/config.js";

const { TextServiceClient } = pkg;

// Initialize Gemini client
const client = new TextServiceClient({
  apiKey: config.chatbot.apikey,
});

export const chatResponse = async (req, res) => {
  const { message } = req.body;
  console.log("message:", message);
  console.log("apikey", config.chatbot.apikey);

  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Message cannot be empty" });
  }

  try {
    const result = await client.generateText({
      model: "models/text-bison-001", // ✅ Supported public model
      prompt: {
        text: message, // ✅ plain string, not { message }
      },
      //   temperature: 0.7,
      //   maxOutputTokens: 512,
    });
    console.log("result::", result);
    const reply =
      result?.candidates?.[0]?.output || "I'm sorry, I didn’t get that.";

    res.json({ output: reply });
  } catch (err) {
    console.error("Gemini chatbot error:", err);
    res.status(500).json({ error: "Chatbot request failed" });
  }
};
