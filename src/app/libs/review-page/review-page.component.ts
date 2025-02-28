import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../../models/appState.interface';
import { viewProjectAction } from '../../store/view-project/view-project-actions';
import { Observable } from 'rxjs';
import { viewProjectSelector } from '../../store/view-project/view-project-selectors';
import { Project } from '../../models/project';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-page',
  imports: [CommonModule],
  templateUrl: './review-page.component.html',
  styleUrl: './review-page.component.css',
})
export class ReviewPageComponent implements OnInit {
  projectId: string | null = null;
  store: Store<AppStateInterface>;
  project$: Observable<Project | null>;

  constructor(private route: ActivatedRoute, store: Store<AppStateInterface>) {
    this.route.paramMap.subscribe((params) => {
      this.projectId = params.get('_id');
      console.log('Project ID:', this.projectId);
    });
    this.store = store;
    this.project$ = this.store.select(viewProjectSelector);
  }

  ngOnInit(): void {
    if (!this.projectId) {
      console.error('No product ID found!');
      return;
    }
    this.store.dispatch(viewProjectAction.getProject({ id: this.projectId }));
  }
}
