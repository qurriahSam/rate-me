import { Injectable } from '@angular/core';
import { RegisterUser } from '../../models/loggedUser';
import { createUserWithEmailAndPassword, Auth } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private auth: Auth) {}

  signUp(credentials: RegisterUser) {
    if (!credentials.email) {
      credentials.email = 'try@gmail.com';
    }
    return from(
      createUserWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password
      )
    );
  }
}
