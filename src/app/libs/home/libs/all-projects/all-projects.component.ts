import { Component } from '@angular/core';
import { VoteCardComponent } from '../vote-card/vote-card.component';
import { SearchComponent } from '../search/search.component';
import { ProjectUploadComponent } from '../project-upload/project-upload.component';

@Component({
  selector: 'app-all-projects',
  standalone: true,
  imports: [VoteCardComponent, SearchComponent, ProjectUploadComponent],
  templateUrl: './all-projects.component.html',
  styleUrl: './all-projects.component.css',
})
export class AllProjectsComponent {}
