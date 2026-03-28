import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  private router = inject(Router);

  signup(
    nameInput: HTMLInputElement,
    emailInput: HTMLInputElement,
    passwordInput: HTMLInputElement
  ): void {
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    // In a real app, you would validate and send this to a backend.
    console.log('Signing up with:', { name, email, password });

    // Simulate successful signup and navigate to home.
    this.router.navigate(['/home']);
  }
}