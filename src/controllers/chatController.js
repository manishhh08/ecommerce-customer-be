import { chatAI } from "../services/chatbotLogic.js";

export const chatResponse = async (req, res) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Message cannot be empty" });
  }

  const result = await chatAI(message);
  if (result) {
    res
      .status(200)
      .json({ status: "success", message: "chat successful", result });
  } else {
    res.status(500).json({ status: "error", message: "chat unsuccessful" });
  }
};
