import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { RegisterAction } from '../../../store/auth/register-actions';
import { AppStateInterface } from '../../../models/appState.interface';
import { Observable } from 'rxjs';
import {
  registerErrorSelector,
  registerIsLoadingSelector,
} from '../../../store/auth/registerSelector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl({ value: '', disabled: false }),
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  isLoading$: Observable<boolean>;
  regError$: Observable<string | null>;

  constructor(private store: Store<AppStateInterface>) {
    this.isLoading$ = store.pipe(select(registerIsLoadingSelector));
    this.regError$ = store.pipe(select(registerErrorSelector));
  }

  handleSubmit() {
    console.log(this.registerForm.value);

    this.store.dispatch(
      RegisterAction.registerUser({
        email: this.registerForm.value.email as string,
        password: this.registerForm.value.password as string,
      })
    );
  }

  validateEmail(email: any) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  validatePassword(password: any) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return false;
    }
    if (!hasUpperCase) {
      return false;
    }
    if (!hasLowerCase) {
      return false;
    }
    if (!hasNumber) {
      return false;
    }
    if (!hasSpecialChar) {
      return false;
    }

    return true;
  }
}
