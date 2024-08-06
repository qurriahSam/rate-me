import { Component } from '@angular/core';
import { VoteCardComponent } from '../libs/vote-card/vote-card.component';
import { NavComponent } from '../../nav/nav.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [VoteCardComponent, NavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
