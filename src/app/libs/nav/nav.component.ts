import { Component } from '@angular/core';
import { AppStateInterface } from '../../models/appState.interface';
import { select, Store } from '@ngrx/store';
import { registerUserSelector } from '../../store/auth/registerSelector';
import { Observable } from 'rxjs';
import { User } from '../../models/loggedUser';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  user$: Observable<User>;

  constructor(private store: Store<AppStateInterface>) {
    this.user$ = store.pipe(select(registerUserSelector));
  }
}
