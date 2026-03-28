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
}
