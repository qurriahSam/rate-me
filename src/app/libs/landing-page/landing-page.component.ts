import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VoteCardComponent } from '../home/libs/vote-card/vote-card.component';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/themeChange/theme-service.service';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink, CommonModule, ThemeToggleComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  projects = [1, 2, 3];
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
