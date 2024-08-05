import { Component } from '@angular/core';
import { VoteCardComponent } from '../libs/vote-card/vote-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [VoteCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
