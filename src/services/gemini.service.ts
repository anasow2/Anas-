import { Injectable } from '@angular/core';
import { GoogleGenAI, Chat, Type } from '@google/genai';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private ai: GoogleGenAI | null = null;
  private chat: Chat | null = null;
  private isInitialized = false;

  constructor() {
    // Initialize only if GEMINI_API_KEY is available
    if (typeof GEMINI_API_KEY !== 'undefined' && GEMINI_API_KEY) {
      try {
        this.ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
        this.initializeChat();
        this.isInitialized = true;
        console.log('✅ Gemini Service initialized');
      } catch (error) {
        console.warn('⚠️ Failed to initialize Gemini Service:', error);
      }
    } else {
      console.warn('⚠️ GEMINI_API_KEY not set. Gemini features will be disabled.');
    }
  }

  private initializeChat() {
    if (!this.ai) return;
    
    const systemInstruction = `You are Sahal, a friendly and helpful assistant for the Sahal Marketplace. You can help users find items, answer questions about listings, and provide negotiation tips. Speak in a helpful and encouraging tone. You can communicate in both English and Somali.`;
    
    this.chat = this.ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
      },
    });
  }

  async *sendMessageStream(message: string): AsyncGenerator<string> {
    if (!this.chat) {
      yield 'Sorry, Gemini service is not initialized. Please set your GEMINI_API_KEY.';
      return;
    }
    const result = await this.chat.sendMessageStream({ message });
    for await (const chunk of result) {
      yield chunk.text;
    }
  }

  async generateListingDetails(base64DataUrl: string, keywords: string, tone: string = 'friendly'): Promise<{ title: string; description: string }> {
    if (!this.ai) {
      return {
        title: 'Error: Gemini service not initialized',
        description: 'Please set your GEMINI_API_KEY to use AI features.'
      };
    }
    
    const parts = base64DataUrl.split(',');
    const mimeTypePart = parts[0].match(/:(.*?);/);
    if (!mimeTypePart || !parts[1]) {
      throw new Error("Invalid base64 data URL");
    }
    const mimeType = mimeTypePart[1];
    const cleanBase64 = parts[1];

    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: cleanBase64,
      },
    };

    const textPrompt = `Based on the attached image and the following keywords: "${keywords}", act as an expert marketplace seller. Generate a compelling, SEO-friendly title and a detailed, persuasive description for this item. Use a ${tone} tone. Ensure the response is in Somali.`;
    
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: 'A compelling, SEO-friendly title for the marketplace listing in Somali. Max 60 characters.'
        },
        description: {
          type: Type.STRING,
          description: 'A detailed and persuasive product description in Somali. Highlight key features and condition. Min 150 characters.'
        }
      },
      required: ['title', 'description']
    };

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, { text: textPrompt }] },
        config: {
          responseMimeType: "application/json",
          responseSchema: responseSchema,
        },
      });

      const jsonString = response.text.trim();
      return JSON.parse(jsonString) as { title: string; description: string };

    } catch (error) {
      console.error('Error generating listing details with Gemini:', error);
      return {
        title: 'Error: Could not generate title',
        description: 'An error occurred while trying to generate the description. Please try again or write one manually.'
      };
    }
  }
}