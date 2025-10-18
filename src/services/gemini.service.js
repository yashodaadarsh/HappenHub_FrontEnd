import axios from "axios";

export const generateResponse = async (messages, event) => {
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  if (!GEMINI_API_KEY) throw new Error("Missing Gemini API key");

  try {
    const userMessage = messages[messages.length - 1]?.content || "";

    const systemPrompt = `
You are HappenBot, a friendly and professional AI assistant helping users understand event details on the HappenHub platform.
Use the event data provided below to give accurate, concise, and context-aware answers.

Event Details:
Title: ${event.title}
Type: ${event.type}
Organizer: ${event.organizer || "Not specified"}
Location: ${event.location}
Start Date: ${event.start_date}
End Date: ${event.end_date}
Salary/Reward: ${event.salary}
Description: ${event.description}

When answering:
- Use simple, professional tone.
- Summarize or elaborate only when needed.
- Avoid repeating the exact text from the event description.
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: `${systemPrompt}\n\nUser: ${userMessage}` }],
          },
        ],
      }
    );

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Sorry, I couldn’t process your request at the moment.";
  }
};
