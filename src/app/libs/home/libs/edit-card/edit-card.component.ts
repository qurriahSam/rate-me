import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../../../models/project';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../../../../models/appState.interface';
import { ProjectAction } from '../../../../store/projects/project-actions';

@Component({
  selector: 'app-edit-card',
  imports: [],
  templateUrl: './edit-card.component.html',
  styleUrl: './edit-card.component.css',
})
export class EditCardComponent implements OnInit {
  @Input() project!: Project;
  description?: string;
  avarageRating?: number;

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    console.log(this.project);
    this.description = this.project.description.slice(0, 100) + '...';
    let rating = this.project.ratings.reduce(
      (acc, curr) => acc + Number(curr.rate),
      0
    );
    this.avarageRating = this.customRound(rating / this.project.ratings.length);
  }

  customRound(num: number): number {
    return Math.floor(num) + (num - Math.floor(num) >= 0.5 ? 0.5 : 0);
  }

  deleteProject() {
    console.log('delete project function invoked');
    this.store.dispatch(ProjectAction.deleteProject({ project: this.project }));
  }
}
