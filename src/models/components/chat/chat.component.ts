import { Component, ChangeDetectionStrategy, signal, inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GeminiService } from '../../../services/gemini.service';
import { ChatMessage } from '../../data.models';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './chat.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  private geminiService = inject(GeminiService);
  
  messages = signal<ChatMessage[]>([]);
  isLoading = signal(false);

  ngOnInit(): void {
    this.messages.set([
      {
        role: 'model',
        text: 'Hello! I am Sahal, your friendly marketplace assistant. How can I help you find the perfect item today?',
      },
    ]);
  }

  async sendMessage(input: HTMLInputElement): Promise<void> {
    const messageText = input.value.trim();
    if (!messageText || this.isLoading()) return;

    // Fix: Combine message updates into a single call for efficiency.
    this.messages.update(current => [
      ...current, 
      { role: 'user', text: messageText },
      { role: 'model', text: '' }
    ]);
    input.value = '';
    this.isLoading.set(true);
    this.scrollToBottom();

    try {
      const stream = this.geminiService.sendMessageStream(messageText);
      for await (const chunk of stream) {
        // Fix: Update signal immutably without mutating objects in the array.
        this.messages.update(current => {
          const lastMessage = current[current.length - 1];
          const updatedLastMessage = { ...lastMessage, text: lastMessage.text + chunk };
          return [...current.slice(0, -1), updatedLastMessage];
        });
        this.scrollToBottom();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Fix: Update signal immutably on error.
      this.messages.update(current => {
        const lastMessage = current[current.length - 1];
        const updatedLastMessage = { ...lastMessage, text: 'Sorry, I encountered an error. Please try again.' };
        return [...current.slice(0, -1), updatedLastMessage];
      });
    } finally {
      this.isLoading.set(false);
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.chatContainer?.nativeElement) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error(err);
    }
  }
}
