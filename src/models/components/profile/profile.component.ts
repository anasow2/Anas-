import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
// Fix: Corrected path for DataService
import { DataService } from '../../../services/data.service';
// Fix: Corrected path for Ad model
import { Ad } from '../../data.models';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  dataService = inject(DataService);
  themeService = inject(ThemeService);
  userAds = this.dataService.userAds;
}
