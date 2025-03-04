import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../../models/appState.interface';
import { viewProjectAction } from '../../store/view-project/view-project-actions';
import { Observable, of } from 'rxjs';
import { viewProjectSelector } from '../../store/view-project/view-project-selectors';
import { Project } from '../../models/project';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-page',
  imports: [CommonModule, NavComponent, FormsModule],
  templateUrl: './review-page.component.html',
  styleUrl: './review-page.component.css',
})
export class ReviewPageComponent implements OnInit {
  projectId: string | null = null;
  store: Store<AppStateInterface>;
  project?: Project | null = null;
  rating: number | null = null;
  averageRating?: number;

  constructor(private route: ActivatedRoute, store: Store<AppStateInterface>) {
    this.route.paramMap.subscribe((params) => {
      this.projectId = params.get('_id');
      console.log('Project ID:', this.projectId);
    });
    this.store = store;
    this.store.select(viewProjectSelector).subscribe((p) => {
      this.project = p;
    });
  }

  ngOnInit(): void {
    if (!this.projectId) {
      console.error('No product ID found!');
      return;
    }
    this.store.dispatch(viewProjectAction.getProject({ id: this.projectId }));
    this.calculateAverageRating();
  }

  calculateAverageRating(): void {
    if (!this.project) {
      return;
    }
    let totalRating = this.project?.ratings.reduce((acc, r) => acc + r.rate, 0);
    let rating = totalRating
      ? totalRating / Math.round(this.project?.ratings.length * 10) / 10
      : 0;
    this.averageRating = this.customRound(rating);
  }

  customRound(number: number) {
    const integerPart = Math.floor(number);

    const decimalPart = number - integerPart;

    if (decimalPart >= 0.5) {
      return integerPart + 0.5;
    } else {
      return integerPart;
    }
  }

  submitForm(form: any): void {
    this.store
      .select((state) => state.auth.loggedUser.id)
      .subscribe((raterId) => {
        if (raterId && this.rating && this.project) {
          this.store.dispatch(
            viewProjectAction.updateProject({
              project: {
                ...this.project,
                ratings: [
                  ...this.project.ratings,
                  { id: raterId, rate: this.rating },
                ],
              },
            })
          );
        }
      });
    //console.log('project:', project);
  }
}
