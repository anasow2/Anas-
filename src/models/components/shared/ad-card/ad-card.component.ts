import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
// Fix: Corrected path for Ad model
import { Ad } from '../../../data.models';

@Component({
  selector: 'app-ad-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ad-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdCardComponent {
  ad = input.required<Ad>();

  toggleFavorite(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    // Logic for toggle favorite goes here
  }
  
  contactWhatsApp(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    window.open(`https://wa.me/252610000000?text=Asc%20Sxb%20alaabtaan%20baan%20rabaa:%20${this.ad().title}`, '_blank');
  }
}
