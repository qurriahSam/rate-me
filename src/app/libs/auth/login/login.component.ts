import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../../../models/appState.interface';
import { RegisterAction } from '../../../store/auth/actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  handleSubmit() {
    console.log(this.loginForm.value);
    console.log(this.loginForm.valid);
    if (this.loginForm.valid) {
      this.store.dispatch(
        RegisterAction.loginUser({
          email: this.loginForm.value.email as string,
          password: this.loginForm.value.password as string,
        })
      );
    }
  }
}
