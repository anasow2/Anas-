import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GeminiService } from '../../../services/gemini.service';

@Component({
  selector: 'app-add-listing',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './add-listing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddListingComponent {
  private geminiService = inject(GeminiService);
  private fb = inject(FormBuilder);

  uploadedImages = signal<string[]>([]);
  isGenerating = signal(false);
  selectedTone = signal('friendly');
  isSubmitted = signal(false);

  listingForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', [Validators.required, Validators.min(0)]],
    location: ['', Validators.required],
  });

  tones = [
    { id: 'friendly', name: 'Saaxiibtinimo', icon: 'sentiment_satisfied' },
    { id: 'professional', name: 'Xirfad leh', icon: 'business_center' },
    { id: 'urgent', name: 'Degdeg ah', icon: 'priority_high' },
    { id: 'premium', name: 'Tayo sare', icon: 'star' },
    { id: 'persuasive', name: 'Qancin', icon: 'campaign' }
  ];

  setTone(toneId: string): void {
    this.selectedTone.set(toneId);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const currentImages = this.uploadedImages();
      const remainingSlots = 5 - currentImages.length;
      const filesToProcess = Array.from(input.files).slice(0, remainingSlots);

      filesToProcess.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (result) {
            this.uploadedImages.update(images => [...images, result]);
          }
        };
        reader.readAsDataURL(file);
      });
      
      // Reset input value so the same files can be selected again if needed
      input.value = '';
    }
  }

  removeImage(index: number): void {
    this.uploadedImages.update(images => images.filter((_, i) => i !== index));
  }

  async generateWithAi(keywordsInput: HTMLTextAreaElement): Promise<void> {
    const images = this.uploadedImages();
    if (images.length === 0) {
      console.log('Please upload an image first.');
      return;
    }
    this.isGenerating.set(true);
    try {
      const result = await this.geminiService.generateListingDetails(
        images[0], 
        keywordsInput.value,
        this.selectedTone()
      );
      this.listingForm.patchValue({
        title: result.title,
        description: result.description
      });
    } catch (error) {
      console.error('AI generation failed', error);
      this.listingForm.patchValue({
        title: 'Generation failed',
        description: 'Could not generate content. Please try again.'
      });
    } finally {
      this.isGenerating.set(false);
    }
  }

  submitListing() {
    this.isSubmitted.set(true);
    if (this.listingForm.invalid) {
      return;
    }

    // In a real application, you would send the data to a backend service.
    console.log('Submitted listing:', {
      images: this.uploadedImages(),
      ...this.listingForm.value
    });

    // Clear form fields after successful submission
    this.uploadedImages.set([]);
    this.listingForm.reset();
    this.isSubmitted.set(false);
  }
}
