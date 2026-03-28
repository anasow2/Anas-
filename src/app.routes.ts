import { Routes } from '@angular/router';
import { HomeComponent } from './models/components/home/home.component';
import { ProductDetailComponent } from './models/components/product-detail/product-detail.component';
import { ChatComponent } from './models/components/chat/chat.component';
import { ProfileComponent } from './models/components/profile/profile.component';
import { AddListingComponent } from './models/components/add-listing/add-listing.component';
import { WelcomeComponent } from './models/components/auth/welcome/welcome.component';
import { LoginComponent } from './models/components/auth/login/login.component';
import { SignupComponent } from './models/components/auth/signup/signup.component';
import { NotificationsComponent } from './models/components/notifications/notifications.component';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent }, 
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'add-listing', component: AddListingComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'favorites', component: HomeComponent }, // Placeholder
  { path: 'messages', component: ChatComponent }, // Placeholder
];