import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RegisterService } from './register-service';
import { RegisterAction } from './register-actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { RegisterUser } from '../../models/loggedUser';

@Injectable()
export class RegisterEffect {
  constructor(
    private _registerAction$: Actions,
    private _registerService$: RegisterService
  ) {}

  register$ = createEffect(() => {
    return this._registerAction$.pipe(
      ofType('[Register] Register User'),
      mergeMap((credentials: RegisterUser) =>
        this._registerService$.signUp(credentials).pipe(
          tap((user) => console.log(user.user)),
          map((user) =>
            RegisterAction.registrationSuccess({
              id: user.user.uid,
              email: user.user.email,
            })
          ),
          catchError((error) => {
            return of(RegisterAction.registrationError({ error: error.code }));
          })
        )
      )
    );
  });
}
