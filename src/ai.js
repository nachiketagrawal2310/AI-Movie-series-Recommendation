
import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI("AIzaSyA2E2FNycWW5-oigmvbxro77m56Nf-J_ns");
// Access the variable we defined in .env
const API_KEY = import.meta.env.VITE_GEMINI_KEY;
console.log("MY KEY IS:", API_KEY);
// Create the connection using the variable
const genAI = new GoogleGenerativeAI(API_KEY);

export const getMediaRecommendation = async (watchedList, userQuery) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  // If the list is empty, handle it gracefully
  const listText = watchedList.length > 0 ? watchedList.join(", ") : "Nothing yet";

  const prompt = `
  Context: The user has a watch history of: [${listText}].
  User Request: "${userQuery}"
  Task: Recommend 3 movies or series based on this history.
  Format: Plain text, conversational.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};