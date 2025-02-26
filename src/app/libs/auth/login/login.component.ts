import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from '../../../models/appState.interface';
import { AuthAction } from '../../../store/auth/actions';
import {
  authIsLoadingSelector,
  registerUserSelector,
} from '../../../store/auth/authSelectors';
import { Observable } from 'rxjs';
import { User } from '../../../models/loggedUser';
import { LocalStorageService } from '../../../services/localStorageService/local-storage.service';

@Component({
    selector: 'app-login',
    imports: [RouterLink, ReactiveFormsModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  regUser$: Observable<User>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>,
    private localStorage: LocalStorageService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.isLoading$ = store.pipe(select(authIsLoadingSelector));
    this.regUser$ = store.pipe(select(registerUserSelector));
  }

  ngOnInit(): void {
    this.regUser$.subscribe((user) => {
      if (user.id) {
        this.localStorage.setItem('id', user.id);
        if (user.email) {
          this.localStorage.setItem('email', user.email);
        }
        this.router.navigate(['/dashboard']);
      }
    });
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
