
import { GoogleGenAI, Type, GenerateContentResponse, Modality } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const detectPests = async (imageB64: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: imageB64.split(',')[1], mimeType: 'image/jpeg' } },
          { text: "Identify any agricultural pests in this image. If found, provide the name, risk level (Low/Medium/High), and immediate action steps for a farmer. If no pests are found, confirm the crop health." }
        ]
      },
    });
    return response.text;
  } catch (error) {
    console.error("Pest detection error:", error);
    return "Error analyzing image. Please ensure the pest is clearly visible and try again.";
  }
};

export const farmAdvisor = async (prompt: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: "You are an expert agricultural advisor for Nigerian smallholder farmers. Provide concise, actionable advice on weather, spray timing, and crop management. Use simple, direct language."
      },
    });
    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Advisor error:", error);
    return { text: "I'm having trouble connecting to my agricultural database.", sources: [] };
  }
};

export const animateField = async (imageB64: string, prompt: string = "Show this farm field thriving with green crops blowing in the wind.") => {
  if (!window.aistudio) return null;
  const hasKey = await window.aistudio.hasSelectedApiKey();
  if (!hasKey) await window.aistudio.openSelectKey();
  const ai = getAI();
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      image: { imageBytes: imageB64.split(',')[1], mimeType: 'image/png' },
      config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
    });
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) return null;
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Veo error:", error);
    return null;
  }
};

export const initLiveVoice = (onAudio: (b64: string) => void, onTranscript: (text: string) => void, language: string = 'English') => {
  const ai = getAI();
  
  // Specific linguistic instructions to capture the "native tune"
  const linguisticGuidelines: Record<string, string> = {
    'Yoruba': "Use warm, respectful tones. Address the user using 'ẹ' (honorific plural) where appropriate. Use common greetings like 'Ẹ n lẹ o' or 'Ẹ kúu iṣẹ́'. Reference 'agbe' for farmer and 'ilẹ̀' for land.",
    'Igbo': "Be direct and encouraging. Use greetings like 'Ndị ọrụ ugbo, nnoo' or 'Kedu ka ọ dị?'. Focus on the community aspect of farming. Reference 'onye ọrụ ugbo' and 'ubi'.",
    'Hausa': "Use a formal and very polite tone. Start with 'Barka da zuwa' or 'Sannu da aiki'. Use traditional Hausa courtesies. Reference 'manomi' and 'gona'.",
    'French': "Adopt a standard West African Francophone professional tone. Use 'Bonjour cher agriculteur' or 'Comment se porte votre récolte?'. Maintain clarity and helpfulness.",
    'English': "Use clear, simple English. Avoid overly technical jargon. Use a helpful, encouraging tone suitable for a professional agricultural consultant."
  };

  const instruction = `
    You are AgriSmart Connect's multilingual voice assistant. 
    You are currently speaking to a farmer in ${language}. 
    ${linguisticGuidelines[language] || ''}
    
    CORE GOALS:
    1. Help farmers understand their farm alerts (pests, weather).
    2. Explain their Credit and Trust Scores simply.
    3. Help them find or interact with Cooperatives.
    4. Provide immediate advice on the best 'spray windows' or 'planting times' based on general agricultural knowledge.

    Always keep responses concise (under 40 words if possible) as this is a voice-only interaction. 
    Sound like a local expert who truly cares about the farmer's yield.
  `;

  const sessionPromise = ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-12-2025',
    callbacks: {
      onopen: () => console.log('Live connected'),
      onmessage: async (message) => {
        const audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
        if (audio) onAudio(audio);
        if (message.serverContent?.outputTranscription) {
          onTranscript(message.serverContent.outputTranscription.text);
        }
      },
      onerror: (e) => console.error('Live error:', e),
      onclose: () => console.log('Live closed'),
    },
    config: {
      responseModalities: [Modality.AUDIO],
      outputAudioTranscription: {},
      systemInstruction: instruction
    }
  });
  return sessionPromise;
};
