import { Component } from '@angular/core';
import { ThemeService } from '../../services/themeChange/theme-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  imports: [CommonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css',
})
export class ThemeToggleComponent {
  theme = '';
  constructor(private themeService: ThemeService) {
    this.applyTheme();
    this.theme = this.themeService.getTheme();
  }
  toggleTheme() {
    const newTheme =
      this.themeService.getTheme() === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(newTheme);
    this.theme = newTheme;
  }

  applyTheme() {
    const savedTheme = this.themeService.getTheme();
    this.themeService.setTheme(savedTheme);
  }
}
