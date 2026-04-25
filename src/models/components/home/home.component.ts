import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
// Fix: Corrected path for DataService
import { DataService } from '../../../services/data.service';
import { NotificationService } from '../../../services/notification.service';
import { AdCardComponent } from '../shared/ad-card/ad-card.component';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, AdCardComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  dataService = inject(DataService);
  notificationService = inject(NotificationService);
  themeService = inject(ThemeService);
  categories = this.dataService.categories;
  ads = this.dataService.ads;

  selectedCategory = signal<string | null>(null);

  filteredAds = computed(() => {
    const selected = this.selectedCategory();
    if (!selected) {
      return this.ads();
    }
    return this.ads().filter(ad => ad.category === selected);
  });

  selectCategory(categoryName: string) {
    if (this.selectedCategory() === categoryName) {
      this.selectedCategory.set(null);
    } else {
      this.selectedCategory.set(categoryName);
    }
  }
}
