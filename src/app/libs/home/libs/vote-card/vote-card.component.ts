import { Component, Input } from '@angular/core';
import { Project } from '../../../../models/project';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vote-card',
  imports: [RouterLink],
  templateUrl: './vote-card.component.html',
  styleUrl: './vote-card.component.css',
})
export class VoteCardComponent {
  @Input() project!: Project;
}
