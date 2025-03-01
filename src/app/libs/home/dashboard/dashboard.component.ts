import { Component } from '@angular/core';
import { VoteCardComponent } from '../libs/vote-card/vote-card.component';
import { NavComponent } from '../../nav/nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
