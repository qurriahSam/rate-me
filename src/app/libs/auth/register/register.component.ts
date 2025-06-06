import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AuthAction } from '../../../store/auth/actions';
import { AppStateInterface } from '../../../models/appState.interface';
import { Observable } from 'rxjs';
import {
  authErrorSelector,
  authIsLoadingSelector,
  registerUserSelector,
} from '../../../store/auth/authSelectors';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/loggedUser';
import { LocalStorageService } from '../../../services/localStorageService/local-storage.service';

@Component({
    selector: 'app-register',
    imports: [RouterLink, ReactiveFormsModule, CommonModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading$: Observable<boolean>;
  regError$: Observable<string | null>;
  regUser$: Observable<User>;

  constructor(
    private store: Store<AppStateInterface>,
    private fb: FormBuilder,
    private router: Router,
    private localStorage: LocalStorageService
  ) {
    this.isLoading$ = store.pipe(select(authIsLoadingSelector));
    this.regError$ = store.pipe(select(authErrorSelector));
    this.regUser$ = store.pipe(select(registerUserSelector));

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

  ngOnInit(): void {
    /*    TODO: if user is saved in localStorage. Update info in store and route to dashboard 
    const userSaved = this.localStorage.getItem('id')

    if(userSaved) {

    }
 */
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
    if (this.registerForm.valid) {
      this.store.dispatch(
        AuthAction.registerUser({
          email: this.registerForm.value.email as string,
          password: this.registerForm.value.password as string,
          username: this.registerForm.value.username as string,
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
