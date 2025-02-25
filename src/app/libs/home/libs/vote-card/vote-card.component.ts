import { Component, Input } from '@angular/core';
import { Project } from '../../../../models/project';

@Component({
  selector: 'app-vote-card',
  standalone: true,
  imports: [],
  templateUrl: './vote-card.component.html',
  styleUrl: './vote-card.component.css',
})
export class VoteCardComponent {
  @Input() project!: Project;
}
