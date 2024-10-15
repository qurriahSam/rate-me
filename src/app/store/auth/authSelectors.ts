import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../../models/appState.interface';

export const selectAuthState = (state: AppStateInterface) => state.auth;

export const authIsLoadingSelector = createSelector(
  selectAuthState,
  (state) => state.isLoading
);
export const authErrorSelector = createSelector(
  selectAuthState,
  (state) => state.error
);
export const registerUserSelector = createSelector(
  selectAuthState,
  (state) => state.loggedUser
);
