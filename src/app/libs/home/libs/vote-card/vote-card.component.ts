import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../../../models/project';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vote-card',
  imports: [RouterLink],
  templateUrl: './vote-card.component.html',
  styleUrl: './vote-card.component.css',
})
export class VoteCardComponent implements OnInit {
  @Input() project!: Project;
  description?: string;
  ngOnInit(): void {
    console.log(this.project);
    this.description = this.project.description.slice(0, 100) + '...';
  }
}
