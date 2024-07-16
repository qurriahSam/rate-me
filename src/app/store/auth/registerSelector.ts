import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../../models/appState.interface';

export const selectRegisterState = (state: AppStateInterface) => state.register;

export const registerIsLoadingSelector = createSelector(
  selectRegisterState,
  (state) => state.isLoading
);
export const registerErrorSelector = createSelector(
  selectRegisterState,
  (state) => state.error
);
export const registerUserSelector = createSelector(
  selectRegisterState,
  (state) => state.loggedUser
);
