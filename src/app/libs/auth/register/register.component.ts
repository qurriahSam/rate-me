import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { RegisterAction } from '../../../store/auth/register-actions';
import { AppStateInterface } from '../../../models/appState.interface';
import { Observable } from 'rxjs';
import { registerIsLoadingSelector } from '../../../store/auth/registerSelector';
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
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  isLoading$: Observable<boolean>;

  constructor(private store: Store<AppStateInterface>) {
    this.isLoading$ = store.pipe(select(registerIsLoadingSelector));
  }

  handleSubmit() {
    console.log(this.registerForm.value);

    this.store.dispatch(
      RegisterAction.registerUser({
        email: 'mail2@g.com',
        password: 'password22',
      })
    );
  }
}
