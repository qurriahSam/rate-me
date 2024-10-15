import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertComponent } from './libs/alert/alert.component';
import { LocalStorageService } from './localStorageService/local-storage.service';
import { Store } from '@ngrx/store';
import { AppStateInterface } from './models/appState.interface';
import { AuthAction } from './store/auth/actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'chat-grp-ai';
  constructor(
    private localStorage: LocalStorageService,
    private store: Store<AppStateInterface>
  ) {}
  ngOnInit(): void {
    const id = this.localStorage.getItem('id');
    const email = this.localStorage.getItem('email');
    if (id && email) {
      this.store.dispatch(
        AuthAction.registrationSuccess({ id: id, email: email })
      );
    }
  }
}
