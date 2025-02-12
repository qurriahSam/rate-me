import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../../models/appState.interface';

export const selectProjectState = (state: AppStateInterface) => state.projects;

export const projectIsLoadingSelector = createSelector(
  selectProjectState,
  (state) => state.isLoading
);
export const getAllProjectsSelector = createSelector(
  selectProjectState,
  (state) => state.projects
);
export const getUserProjectsSelector = createSelector(
  selectProjectState,
  (state) => state.userProjects
);
