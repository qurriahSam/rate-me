import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from '../../../models/appState.interface';
import { AuthAction } from '../../../store/auth/actions';
import { authIsLoadingSelector } from '../../../store/auth/authSelectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.isLoading$ = store.pipe(select(authIsLoadingSelector));
  }

  handleSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(
        AuthAction.loginUser({
          email: this.loginForm.value.email as string,
          password: this.loginForm.value.password as string,
        })
      );
    }
  }
}
