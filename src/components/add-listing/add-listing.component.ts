
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-listing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './add-listing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddListingComponent {
  submitListing(
    description: HTMLTextAreaElement,
    price: HTMLInputElement,
    location: HTMLSelectElement
  ) {
    // In a real application, you would send the data to a backend service.
    console.log('Submitted listing:', {
      description: description.value,
      price: price.value,
      location: location.value,
    });

    // Clear form fields after successful submission
    description.value = '';
    price.value = '';
    location.value = '';
  }
}
