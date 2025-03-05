import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppStateInterface } from '../../../../models/appState.interface';
import { Project } from '../../../../models/project';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import {
  viewProjectIsLoadingSelector,
  viewProjectSelector,
} from '../../../../store/view-project/view-project-selectors';
import { viewProjectAction } from '../../../../store/view-project/view-project-actions';
import { FormsModule } from '@angular/forms';
import { NavComponent } from '../../../nav/nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-page',
  imports: [CommonModule, NavComponent, FormsModule],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.css',
})
export class EditPageComponent implements OnInit, OnDestroy {
  projectId: string | null = null;
  store: Store<AppStateInterface>;
  project?: Project | null = null;
  rating: number | null = null;
  averageRating?: number;
  isRated = false;
  isLoading$: Observable<boolean>;
  private subscriptions: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, store: Store<AppStateInterface>) {
    this.store = store;
    this.isLoading$ = this.store.select(viewProjectIsLoadingSelector);
  }

  ngOnInit(): void {
    const routeSub = this.route.paramMap.subscribe((params) => {
      this.projectId = params.get('_id');
      if (this.projectId) {
        this.store.dispatch(
          viewProjectAction.getProject({ id: this.projectId })
        );
      } else {
        console.error('No project ID found!');
      }
    });
    this.subscriptions.add(routeSub);

    const projectSub = this.store.select(viewProjectSelector).subscribe((p) => {
      this.project = p;
      this.calculateAverageRating();
      const authIdSub = this.store
        .select((state) => state.auth.loggedUser.id)
        .subscribe((raterId) => {
          console.log(this.project, raterId);
          if (raterId && this.project) {
            this.project.ratings.forEach((r) => {
              if (r.id === raterId) {
                this.isRated = true;
                console.log('You have already rated this project!');
              }
            });
          }
        });
      this.subscriptions.add(authIdSub);
    });
    this.subscriptions.add(projectSub);

    const authIdSub = this.store
      .select((state) => state.auth.loggedUser.id)
      .subscribe((raterId) => {
        console.log(this.project, raterId);
        if (raterId && this.project) {
          this.project.ratings.forEach((r) => {
            console.log(r.id, raterId);
            if (r.id === raterId) {
              this.isRated = true;
              console.log('You have already rated this project!');
            }
          });
        }
      });
    this.subscriptions.add(authIdSub);
  }

  calculateAverageRating(): void {
    if (
      !this.project ||
      !Array.isArray(this.project.ratings) ||
      this.project.ratings.length === 0
    ) {
      this.averageRating = 0;
      return;
    }

    const totalRating = this.project.ratings.reduce(
      (total, { rate }) => total + Number(rate),
      0
    );
    this.averageRating = this.customRound(
      totalRating / this.project.ratings.length
    );
  }

  customRound(num: number): number {
    return Math.floor(num) + (num - Math.floor(num) >= 0.5 ? 0.5 : 0);
  }

  submitForm(form: any): void {
    const authSub = this.store
      .select((state) => state.auth.loggedUser.id)
      .subscribe((raterId) => {
        if (raterId && this.rating && this.project) {
          this.store.dispatch(
            viewProjectAction.updateProject({
              project: {
                ...this.project,
                ratings: [
                  ...(Array.isArray(this.project.ratings)
                    ? this.project.ratings
                    : []),
                  { id: raterId, rate: this.rating },
                ],
              },
            })
          );
        }
      });
    this.subscriptions.add(authSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
