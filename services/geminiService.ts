///<reference types="vite/client" />
import { GoogleGenAI, Part } from "@google/genai";
import { GenerationRequest, InputType, InfographicStyle, Language } from '../types';

export const ensureApiKey = async (): Promise<boolean> => {
  const win = window as any;
  if (win.aistudio) {
    const hasKey = await win.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await win.aistudio.openSelectKey();
      return true; // Assume success after modal interaction as per guidance
    }
    return true;
  }
  // Fallback: If window.aistudio is not present, return true to allow execution 
  // (using process.env.API_KEY directly).
  return true;
};

declare global {
  interface Window {
    env: {
      VITE_API_KEY: string;
    };
  }
}

export const generateInfographic = async (
  request: GenerationRequest,
  style: InfographicStyle
): Promise<string> => {
  // Always create a new instance right before making an API call to ensure 
  // it uses the most up-to-date API key from the dialog.
  const cloudKey = window.env?.VITE_API_KEY;
  const localKey = import.meta.env.VITE_API_KEY;
  
  // Logic chọn key: Nếu cloudKey có giá trị (và không phải placeholder) thì dùng, ngược lại dùng localKey
  let apiKey = cloudKey;
  
  // Kiểm tra kỹ hơn để tránh lấy phải chuỗi "KEY_HOLDER" hoặc rỗng
  if (!apiKey || apiKey === "KEY_HOLDER" || apiKey.trim() === "") {
     apiKey = localKey;
     console.log("Using LOCAL API Key");
  } else {
     console.log("Using CLOUD RUN API Key");
  }

  if (!apiKey) {
      console.error("CRITICAL: API Key is missing everywhere!");
      throw new Error("API Key not found. Please check .env file (Local) or Cloud Run Variables.");
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });
  const modelId = 'gemini-3-pro-image-preview';
  
  const parts: Part[] = [];
  let promptText = `Perform thorough research to generate a high-quality, factually accurate, and detailed infographic image. 
  CRITICAL INSTRUCTION: All text within the infographic MUST be in ${request.language}. `;

  if (request.language === Language.VI) {
    promptText += `Ensure all Vietnamese characters and diacritics (like ă, â, đ, ê, ô, ơ, ư and tone marks) are rendered accurately, clearly, and with correct typography. `;
  }

  // 1. Handle Input Data
  if (request.inputType === InputType.TEXT) {
    promptText += `\nThe core concept/idea to research and visualize is: "${request.textContent}". `;
  } else if (request.inputType === InputType.CSV) {
    promptText += `\nThe data to visualize (provided in CSV format) is: \n${request.textContent}\n. `;
  } else if (request.inputType === InputType.IMAGE && request.fileData) {
    parts.push({
      inlineData: {
        data: request.fileData,
        mimeType: request.mimeType || 'image/png',
      }
    });
    promptText += `\nUse the provided primary image as the background and visual foundation. `;
  } else if (request.inputType === InputType.WHITEPAPER) {
    // Detailed Layering for Whitepaper
    promptText += `\nGenerate a complex, multi-layered visual summary (Whitepaper Style). Structure the image with the following distinct visual layers:
    
    1. **LAYER 1: FOUNDATION (Background/Context)**:
       Visualize the core concept: "${request.layerConcept}".
       Make this the setting or the foundational structure of the image.

    2. **LAYER 2: EVIDENCE (Middle Ground/Detail)**:
       Visualize the supporting data and mechanism: "${request.layerData}".
       Integrate charts, floating metrics, or mechanical details that prove the concept.

    3. **LAYER 3: CONCLUSION (Foreground/Action)**:
       Visualize the key takeaway or call to action: "${request.layerConclusion}".
       This should be the most prominent, high-contrast element (e.g., a stamp, a glowing artifact, or a bold header).
    
    Blend these three layers into a single cohesive, high-density infographic.`;
  }

  // 2. Handle Logo Integration
  if (request.logoData) {
    parts.push({
      inlineData: {
        data: request.logoData,
        mimeType: request.logoMimeType || 'image/png',
      }
    });
    promptText += `\nI have also provided a brand logo image. Please professionally integrate this logo into the infographic, placing it in a logical branding position (like a corner) where it is visible but does not obscure the main content. `;
  }

  // 3. Add User Refinement Instructions
  if (request.additionalInstructions && request.additionalInstructions.trim()) {
    promptText += `\n\nADDITIONAL REFINEMENT INSTRUCTIONS FROM USER:\n${request.additionalInstructions}\nStrictly follow these specific guidelines during generation.`;
  }

  // 4. Add Style Instructions
  promptText += `\n\nDESIGN STYLE INSTRUCTIONS:\n${style.promptModifier}`;
  promptText += `\n\nIf the topic involves geography, cities, or specific buildings, use Google Search to verify accurate map layouts and architectural details. The final output must be a single cohesive image that strictly adheres to the described aesthetic and maintains perfect legibility for all text elements in ${request.language}.`;

  // Place prompt text first as context for the images
  parts.unshift({ text: promptText });

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: parts,
      },
      config: {
        imageConfig: {
          aspectRatio: request.inputType === InputType.WHITEPAPER ? '9:16' : '4:3', // Tall aspect ratio for whitepapers
          imageSize: '1K',
        },
        tools: [{ googleSearch: {} }], // Use Google Search for the requested research
      },
    });

    // Parse response for image
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image data found in response.");

  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    
    const errorMessage = error.message || "";
    const isPermissionError = errorMessage.includes("PERMISSION_DENIED") || errorMessage.includes("403");
    const isNotFoundError = errorMessage.includes("Requested entity was not found") || errorMessage.includes("404");

    if (isPermissionError || isNotFoundError) {
      const win = window as any;
      if (win.aistudio) {
        // Reset the key selection state by prompting the user to select a key again
        await win.aistudio.openSelectKey();
      }
      throw new Error("Access Denied: Please ensure you select an API key from a project with the Gemini 3 Pro Image API enabled and active billing (https://ai.google.dev/gemini-api/docs/billing).");
    }
    
    throw error;
  }
};
