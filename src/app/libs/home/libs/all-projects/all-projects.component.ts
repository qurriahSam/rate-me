import { Component, OnInit } from '@angular/core';
import { VoteCardComponent } from '../vote-card/vote-card.component';
import { SearchComponent } from '../search/search.component';
import { ProjectUploadComponent } from '../project-upload/project-upload.component';
import { AppStateInterface } from '../../../../models/appState.interface';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Project } from '../../../../models/project';
import {
  getAllProjectsSelector,
  projectIsLoadingSelector,
} from '../../../../store/projects/project-selectors';
import { ProjectAction } from '../../../../store/projects/project-actions';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-all-projects',
    imports: [
        CommonModule,
        VoteCardComponent,
        SearchComponent,
        ProjectUploadComponent,
    ],
    templateUrl: './all-projects.component.html',
    styleUrl: './all-projects.component.css'
})
export class AllProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  isLoading$: Observable<Boolean>;

  constructor(private store: Store<AppStateInterface>) {
    this.projects$ = this.store.select(getAllProjectsSelector);
    this.isLoading$ = this.store.select(projectIsLoadingSelector);
  }
  ngOnInit(): void {
    this.store.dispatch(ProjectAction.getAllProjects());
  }
}
