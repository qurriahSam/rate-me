import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RegisterService } from './register-service';
import { RegisterAction } from './actions';
import { catchError, delay, map, merge, mergeMap, of, tap } from 'rxjs';
import { RegisterUser } from '../../models/loggedUser';

@Injectable()
export class LoginEffect {
  constructor(
    private _loginAction$: Actions,
    private _registerService$: RegisterService
  ) {}

  login$ = createEffect(() => {
    return this._loginAction$.pipe(
      ofType('[Register] Login User'),
      mergeMap((credentials: RegisterUser) =>
        this._registerService$.signIn(credentials).pipe(
          tap(console.log),
          map((user) =>
            RegisterAction.registrationSuccess({
              id: user.user.uid,
              email: user.user.email,
            })
          ),
          catchError((error) => {
            const errorTimeout$ = of(
              RegisterAction.registrationError({ error: null })
            ).pipe(delay(2000));
            const postError$ = of(
              RegisterAction.registrationError({ error: error.code })
            );
            return merge(postError$, errorTimeout$);
          })
        )
      )
    );
  });
}
