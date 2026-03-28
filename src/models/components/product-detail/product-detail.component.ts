import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
// Fix: Corrected path for DataService
import { DataService } from '../../../services/data.service';
import { NotificationService } from '../../../services/notification.service';
// Fix: Corrected path for Ad model
import { Ad } from '../../data.models';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);
  private notificationService = inject(NotificationService);
  
  isOfferModalVisible = signal(false);
  showOfferConfirmation = signal(false);

  private adId = toSignal(this.route.paramMap.pipe(
    map(params => Number(params.get('id')))
  ));

  ad = computed(() => {
    const id = this.adId();
    // Fix: Add a robust type guard to ensure 'id' is a valid number before using it.
    // The 'id' from route params can be inferred as 'unknown' or be NaN.
    if (typeof id === 'number' && !isNaN(id) && id > 0) {
      return this.dataService.getAdById(id);
    }
    return undefined;
  });

  openOfferModal(): void {
    this.isOfferModalVisible.set(true);
  }

  closeOfferModal(): void {
    this.isOfferModalVisible.set(false);
  }

  submitOffer(offerInput: HTMLInputElement): void {
    const offerValue = offerInput.value;
    if (!offerValue) return;

    const currentAd = this.ad();
    console.log(`Offer submitted: $${offerValue} for ad ID ${currentAd?.id}`);
    
    // In a real app, this would be sent to a backend service.
    if (currentAd) {
      this.notificationService.addNotification({
        title: 'New Offer Received!',
        message: `You received a new offer of $${offerValue} on your listing "${currentAd.title}".`,
        link: `/product/${currentAd.id}`
      });
    }
    
    offerInput.value = '';
    this.closeOfferModal();
    this.showOfferConfirmation.set(true);
    
    setTimeout(() => {
      this.showOfferConfirmation.set(false);
    }, 3000); // Hide confirmation after 3 seconds
  }
}
