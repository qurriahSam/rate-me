import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RegisterService } from './auth-service';
import { mergeMap, map, catchError, delay, of, merge } from 'rxjs';
import { AuthAction } from './actions';

@Injectable()
export class LogoutEffect {
  constructor(
    private _logoutAction$: Actions,
    private _registerService$: RegisterService
  ) {}

  logout$ = createEffect(() => {
    return this._logoutAction$.pipe(
      ofType('[Auth] Logout User'),
      mergeMap(() =>
        this._registerService$.logout().pipe(
          map(() => AuthAction.registrationSuccess({ id: null, email: null })),
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
