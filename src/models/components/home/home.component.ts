import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
// Fix: Corrected path for DataService
import { DataService } from '../../../services/data.service';
import { NotificationService } from '../../../services/notification.service';
import { AdCardComponent } from '../shared/ad-card/ad-card.component';

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
  categories = this.dataService.categories;
  ads = this.dataService.ads;
}
