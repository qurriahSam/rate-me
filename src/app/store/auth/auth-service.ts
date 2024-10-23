import { Injectable } from '@angular/core';
import { RegisterUser, LoginUser } from '../../models/loggedUser';
import {
  createUserWithEmailAndPassword,
  Auth,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { from, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private auth: Auth) {}

  signUp(credentials: RegisterUser) {
    if (!credentials.email) {
      return throwError(() => new Error('invalid email'));
    }
    return from(
      createUserWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password
      )
    );
  }

  signIn(credentials: LoginUser) {
    if (!credentials.email) {
      return throwError(() => new Error('invalid email'));
    }
    return from(
      signInWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password
      )
    );
  }

  logout() {
    return from(signOut(this.auth));
  }
}
