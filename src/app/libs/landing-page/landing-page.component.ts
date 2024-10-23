import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VoteCardComponent } from '../home/libs/vote-card/vote-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, VoteCardComponent, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  projects = [1, 2, 3];
}
