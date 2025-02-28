import { Component, inject } from '@angular/core';
import { Project } from '../../../../models/project';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../../../../models/appState.interface';
import { Observable } from 'rxjs';
import {
  getAllProjectsSelector,
  getUserProjectsSelector,
} from '../../../../store/projects/project-selectors';
import { CommonModule } from '@angular/common';
import { VoteCardComponent } from '../vote-card/vote-card.component';
import { SearchComponent } from '../search/search.component';
import { ProjectUploadComponent } from '../project-upload/project-upload.component';

@Component({
    selector: 'app-my-projects',
    imports: [
        CommonModule,
        VoteCardComponent,
        SearchComponent,
        ProjectUploadComponent,
    ],
    templateUrl: './my-projects.component.html',
    styleUrl: './my-projects.component.css'
})
export class MyProjectsComponent {
  projects$: Observable<Project[]>;
  constructor(private store: Store<AppStateInterface>) {
    this.projects$ = this.store.select(getUserProjectsSelector);
  }
}
