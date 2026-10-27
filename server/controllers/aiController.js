import { generateCoachResponse } from "../services/aiService.js";

export const chatWithCoach = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({
        message: "Please enter a message",
      });
    }

    const reply = await generateCoachResponse({
      message,
      user: req.user,
    });

    res.json({
      reply,
    });
  } catch (error) {
    res.status(500).json({
      message: "AI coach unavailable",
    });
  }
};