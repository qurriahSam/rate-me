import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RegisterService } from './register-service';
import { RegisterAction } from './register-actions';
import { catchError, delay, map, merge, mergeMap, of, tap } from 'rxjs';
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
