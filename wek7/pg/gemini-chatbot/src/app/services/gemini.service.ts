

import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../../enviroments/enviroment.development';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private chatSession: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI(environment.googleApiKey);

    // Define system instructions to restrict the chatbot to pregnancy-related questions
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
      systemInstruction: `
        You are a helpful chatbot specializing in pregnancy-related questions. 
        Only answer questions related to pregnancy, childbirth, prenatal care, postpartum care, and baby health in the early stages. 
        If the user asks a question unrelated to pregnancy, politely inform them that you can only assist with pregnancy-related topics and encourage them to ask a relevant question.
        Provide accurate, concise, and supportive answers. Do not provide medical advice that requires a professional diagnosis; instead, suggest consulting a healthcare provider when appropriate.
      `
    });

    this.chatSession = this.model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 100
      }
    });
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const result = await this.chatSession.sendMessage(message);
      return result.response.text();
    } catch (error: any) {
      console.error('Error communicating with Gemini API:', error.message, error.stack);
      if (error.message.includes('API key')) {
        return 'Error: Invalid API key. Please check your Gemini API key in the environment settings.';
      } else if (error.message.includes('quota')) {
        return 'Error: API quota exceeded. Please try again later or check your API limits.';
      } else if (error.message.includes('network')) {
        return 'Error: Network issue. Please check your internet connection and try again.';
      }
      return 'Sorry, I encountered an error. Please try again.';
    }
  }
}