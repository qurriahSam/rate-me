import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from '../../models/appState.interface';
import { Observable } from 'rxjs';
import { authErrorSelector } from '../../store/auth/authSelectors';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-alert',
    imports: [CommonModule],
    templateUrl: './alert.component.html',
    styleUrl: './alert.component.css'
})
export class AlertComponent {
  regError$: Observable<string | null>;
  constructor(private store: Store<AppStateInterface>) {
    this.regError$ = store.pipe(select(authErrorSelector));
  }
}
