import { Injectable } from '@angular/core';
import { LocalStorageService } from '../localStorageService/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(private localStorage: LocalStorageService) {}
  setTheme(theme: 'light' | 'dark') {
    document.documentElement.setAttribute('data-theme', theme);
    this.localStorage.setItem('theme', theme);
  }

  getTheme(): 'light' | 'dark' {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  }
}
