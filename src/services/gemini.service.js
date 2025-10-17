import axios from "axios";

export const generateResponse = async (messages, systemPrompt) => {
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    throw new Error("Missing Gemini API key");
  }

  try {
    const userMessage = messages[messages.length - 1]?.content || "";

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: systemPrompt + "\n\nUser: " + userMessage }
            ],
          },
        ],
      }
    );

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
};
