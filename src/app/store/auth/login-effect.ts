import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RegisterService } from './auth-service';
import { AuthAction } from './actions';
import { catchError, delay, map, merge, mergeMap, of, tap } from 'rxjs';
import { LoginUser } from '../../models/loggedUser';

@Injectable()
export class LoginEffect {
  constructor(
    private _loginAction: Actions,
    private _registerService$: RegisterService
  ) {}

  login$ = createEffect(() => {
    return this._loginAction.pipe(
      ofType('[Auth] Login User'),
      mergeMap((credentials: LoginUser) =>
        this._registerService$.signIn(credentials).pipe(
          tap((user) => console.log(user)),
          map((user) =>
            AuthAction.registrationSuccess({
              id: user.user.uid,
              email: user.user.email,
              username: user.user.displayName,
            })
          ),
          catchError((error) => {
            const errorTimeout$ = of(
              AuthAction.registrationError({ error: null })
            ).pipe(delay(2000));
            const postError$ = of(
              AuthAction.registrationError({ error: 'Wrong email or password' })
            );
            return merge(postError$, errorTimeout$);
          })
        )
      )
    );
  });
}
