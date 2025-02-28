import { Component } from '@angular/core';
import { AppStateInterface } from '../../models/appState.interface';
import { select, Store } from '@ngrx/store';
import { registerUserSelector } from '../../store/auth/authSelectors';
import { Observable } from 'rxjs';
import { User } from '../../models/loggedUser';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthAction } from '../../store/auth/actions';
import { LocalStorageService } from '../../services/localStorageService/local-storage.service';

@Component({
  selector: 'app-nav',
  imports: [CommonModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  user$: Observable<User>;

  constructor(
    private store: Store<AppStateInterface>,
    private localStorage: LocalStorageService
  ) {
    this.user$ = store.pipe(select(registerUserSelector));
  }

  logout() {
    this.store.dispatch(AuthAction.logoutUser());
    this.localStorage.clear();
  }
}
