import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { registerUserSelector } from '../store/auth/authSelectors';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(registerUserSelector).pipe(
    take(1),
    map((user) => {
      if (user.id) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
