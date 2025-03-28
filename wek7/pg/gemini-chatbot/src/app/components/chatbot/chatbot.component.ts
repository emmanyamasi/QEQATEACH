import { Component } from '@angular/core';
import { GeminiService } from '../../services/gemini.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  messages: {text:string; sender:string}[]=[];
  userMessage: string =''
  constructor(private geminiService:GeminiService){}

  async sendMessage(){
    if(!this.userMessage.trim()) return;

    this.messages.push({text: this.userMessage, sender:'user'});
    const response = await this.geminiService.sendMessage(this.userMessage);
    this.messages.push({text:response,sender:'chatbot'});

    this.userMessage ='';
  }

}
