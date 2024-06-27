import { Injectable } from '@angular/core';
import { RegisterUser } from '../../models/loggedUser';
import {
  getAuth,
  createUserWithEmailAndPassword,
  Auth,
} from '@angular/fire/auth';
import { from } from 'rxjs';
import { FirebaseApp } from '@angular/fire/app';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  auth: Auth;

  constructor(private afApp: FirebaseApp) {
    this.auth = getAuth(this.afApp);
  }

  registerUser(credentials: RegisterUser) {
    return from(
      createUserWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password
      )
    );
  }
}
