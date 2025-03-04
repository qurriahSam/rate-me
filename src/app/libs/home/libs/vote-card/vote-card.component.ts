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
  avarageRating?: number;
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
}
