import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private router = inject(Router);

  login(emailInput: HTMLInputElement, passwordInput: HTMLInputElement): void {
    const email = emailInput.value;
    const password = passwordInput.value;

    // In a real app, you would validate and send this to a backend.
    console.log('Logging in with:', { email, password });

    // Simulate successful login and navigate to home.
    this.router.navigate(['/home']);
  }
}