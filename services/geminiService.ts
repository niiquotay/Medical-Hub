import { GoogleGenAI } from "@google/genai";

// Always use process.env.API_KEY directly in constructor as per guidelines.
// Assume process.env.API_KEY is pre-configured and valid.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const checkSymptoms = async (symptoms: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', // Basic Q&A Task
      contents: `You are a helpful AI medical assistant in a telemedicine app. 
      The user is describing these symptoms: "${symptoms}". 
      Provide a brief, reassuring, but professional summary of potential causes and advise them to consult a doctor. 
      Keep it under 150 words. Do not diagnose, only suggest potential issues.`,
    });
    return response.text || "I'm sorry, I couldn't process that request at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Service temporarily unavailable. Please try again later.";
  }
};

export const analyzeMedicalReport = async (reportText: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Complex Text Task
      contents: `Summarize this medical report for a patient in simple terms: "${reportText}".`,
      config: {
        thinkingConfig: { thinkingBudget: 1024 } // Use thinking for complex reasoning
      }
    });
    return response.text || "Could not analyze report.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Analysis failed.";
  }
};