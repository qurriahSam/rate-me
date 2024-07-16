import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  registerForm: FormGroup;
  isLoading$: Observable<boolean>;
  regError$: Observable<string | null>;

  constructor(
    private store: Store<AppStateInterface>,
    private fb: FormBuilder
  ) {
    this.isLoading$ = store.pipe(select(registerIsLoadingSelector));
    this.regError$ = store.pipe(select(registerErrorSelector));

    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  handleSubmit() {
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      this.store.dispatch(
        RegisterAction.registerUser({
          email: this.registerForm.value.email as string,
          password: this.registerForm.value.password as string,
        })
      );
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }
}
