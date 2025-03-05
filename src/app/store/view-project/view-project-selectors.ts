import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../../models/appState.interface';

export const selectViewProjectState = (state: AppStateInterface) =>
  state.viewProject;

export const viewProjectIsLoadingSelector = createSelector(
  selectViewProjectState,
  (state) => state.isLoading
);

export const viewProjectSelector = createSelector(
  selectViewProjectState,
  (state) => state.project
);

export const viewProjectErrorSelector = createSelector(
  selectViewProjectState,
  (state) => state.error
);
