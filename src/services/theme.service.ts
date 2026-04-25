import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  
  isDarkMode = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Check local storage or system preference
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark') {
        this.isDarkMode.set(true);
      } else if (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.isDarkMode.set(true);
      }
      
      this.applyTheme();
    }

    effect(() => {
      this.applyTheme();
    });
  }

  toggleTheme() {
    this.isDarkMode.update(mode => !mode);
  }

  private applyTheme() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    if (this.isDarkMode()) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
}
