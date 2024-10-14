import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RegisterService } from './auth-service';
import { AuthAction } from './actions';
import { catchError, delay, map, merge, mergeMap, of } from 'rxjs';
import { RegisterUser } from '../../models/loggedUser';

@Injectable()
export class RegisterEffect {
  constructor(
    private _registerAction$: Actions,
    private _registerService$: RegisterService
  ) {}

  register$ = createEffect(() => {
    return this._registerAction$.pipe(
      ofType('[Auth] Register User'),
      mergeMap((credentials: RegisterUser) =>
        this._registerService$.signUp(credentials).pipe(
          map((user) =>
            AuthAction.registrationSuccess({
              id: user.user.uid,
              email: user.user.email,
            })
          ),
          catchError((error) => {
            const errorTimeout$ = of(
              AuthAction.registrationError({ error: null })
            ).pipe(delay(2000));
            const postError$ = of(
              AuthAction.registrationError({ error: error.code })
            );
            return merge(postError$, errorTimeout$);
          })
        )
      )
    );
  });
}
