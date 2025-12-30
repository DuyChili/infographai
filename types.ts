
export enum InputType {
  TEXT = 'TEXT',
  CSV = 'CSV',
  IMAGE = 'IMAGE',
  WHITEPAPER = 'WHITEPAPER'
}

export enum Language {
  EN = 'English',
  VI = 'Vietnamese'
}

export interface InfographicStyle {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name or emoji
  promptModifier: string;
}

export interface GenerationRequest {
  inputType: InputType;
  textContent?: string; // Used for simple text
  
  // Whitepaper Layered Details
  layerConcept?: string;
  layerData?: string;
  layerConclusion?: string;

  fileData?: string; // Base64 for primary image
  mimeType?: string;
  logoData?: string; // Base64 for logo
  logoMimeType?: string;
  styleId: string;
  language: Language;
  additionalInstructions?: string;
}

export interface GeneratedResult {
  imageUrl: string;
  timestamp: number;
}
