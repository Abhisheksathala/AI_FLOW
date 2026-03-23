const express = require("express");
const axios = require("axios");
const Conversation =  require("../models/ConversationModel.js")

const ConvRoute = express.Router();

ConvRoute.post("/api/ask-ai", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openrouter/free",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          // "HTTP-Referer": "http://localhost:3000",
          "X-Title": "AI Flow App",
        },
      },
    );
    const aiMessage = response.data.choices[0].message.content;
    res.json({ response: aiMessage });
  } catch (error) {
    console.error("OpenRouter error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

ConvRoute.post("/api/save", async (req, res) => {
  const { prompt, response } = req.body;

  if (!prompt || !response) {
    return res
      .status(400)
      .json({ error: "Both prompt and response are required" });
  }

  try {
    const conversation = new Conversation({ prompt, response });
    await conversation.save();
    res.json({ message: "Saved successfully", id: conversation._id });
  } catch (error) {
    res.status(500).json({ error: "Failed to save to database" });
  }
});

ConvRoute.get("/api/latest-message", async (req, res) => {
  try {
    const latest = await Conversation.findOne().sort({ createdAt: -1 });
    res.json({ message: latest ? latest.prompt : "Welcome to our store!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch message" });
  }
});

module.exports = ConvRoute;
