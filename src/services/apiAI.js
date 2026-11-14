import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("⚠️ VITE_GEMINI_API_KEY is not defined in your environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export const PRIMARY_MODEL_NAME = "gemini-3.5-flash-lite";
export const FALLBACK_MODEL_NAME = "gemini-3.1-flash-lite";

export const primaryModel = genAI.getGenerativeModel({
  model: PRIMARY_MODEL_NAME,
});

export const fallbackModel = genAI.getGenerativeModel({
  model: FALLBACK_MODEL_NAME,
});

/**
 * Execute generateContent with automatic model fallback
 * Primary: gemini-3.5-flash-lite
 * Fallback: gemini-3.1-flash-lite
 */
export async function generateContentWithFallback(prompt, generationConfig = {}) {
  try {
    const model = genAI.getGenerativeModel({
      model: PRIMARY_MODEL_NAME,
      generationConfig,
    });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (primaryError) {
    console.warn(
      `[AI Service] Primary model (${PRIMARY_MODEL_NAME}) failed. Falling back to ${FALLBACK_MODEL_NAME}. Reason:`,
      primaryError.message
    );

    const fallback = genAI.getGenerativeModel({
      model: FALLBACK_MODEL_NAME,
      generationConfig,
    });
    const result = await fallback.generateContent(prompt);
    return result.response.text();
  }
}

/**
 * Execute chat interaction with automatic model fallback
 */
export async function executeChatWithFallback(systemPrompt, formattedHistory, userMessage) {
  const initialHistory = [
    { role: "user", parts: [{ text: `System instructions: ${systemPrompt}` }] },
    {
      role: "model",
      parts: [
        {
          text: "Understood! I am ready to assist hotel staff with bookings, cabins, guests, and operational metrics.",
        },
      ],
    },
    ...formattedHistory,
  ];

  try {
    const chat = primaryModel.startChat({
      history: initialHistory,
    });
    const result = await chat.sendMessage(userMessage);
    return result.response.text();
  } catch (primaryError) {
    console.warn(
      `[AI Chat] Primary model (${PRIMARY_MODEL_NAME}) chat failed. Falling back to ${FALLBACK_MODEL_NAME}. Reason:`,
      primaryError.message
    );

    const fallbackChat = fallbackModel.startChat({
      history: initialHistory,
    });
    const result = await fallbackChat.sendMessage(userMessage);
    return result.response.text();
  }
}

export default genAI;
