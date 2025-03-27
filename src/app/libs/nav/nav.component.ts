import { Component } from '@angular/core';
import { AppStateInterface } from '../../models/appState.interface';
import { select, Store } from '@ngrx/store';
import { registerUserSelector } from '../../store/auth/authSelectors';
import { map, Observable, tap } from 'rxjs';
import { User } from '../../models/loggedUser';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { AuthAction } from '../../store/auth/actions';
import { LocalStorageService } from '../../services/localStorageService/local-storage.service';

@Component({
  selector: 'app-nav',
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  user$: Observable<User>;
  activeLink: string = 'all-projects';

  constructor(
    private store: Store<AppStateInterface>,
    private localStorage: LocalStorageService,
    private route: ActivatedRoute
  ) {
    this.user$ = store.pipe(select(registerUserSelector));
  }

  logout() {
    this.store.dispatch(AuthAction.logoutUser());
    this.localStorage.clear();
  }
}
