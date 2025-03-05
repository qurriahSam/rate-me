import { createReducer, on } from '@ngrx/store';
import { viewProjectAction } from './view-project-actions';
import { ViewProjectStateInterface } from '../../models/project';

const initialState: ViewProjectStateInterface = {
  isLoading: false,
  project: null,
  error: null,
};

export const viewProjectReducer = createReducer(
  initialState,
  on(viewProjectAction.getProject, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(viewProjectAction.getProjectSuccess, (state, { project }) => ({
    ...state,
    isLoading: false,
    project,
  })),
  on(viewProjectAction.getProjectError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(viewProjectAction.updateProject, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(viewProjectAction.updateProjectSuccess, (state, { project }) => ({
    ...state,
    isLoading: false,
    project,
  })),
  on(viewProjectAction.updateRating, (state, action) => {
    if (!state.project) {
      return state;
    }

    const ratings = state.project.ratings || [];
    const newRating = {
      id: action.id,
      rate: action.rate,
    };

    return {
      ...state,
      project: {
        ...state.project,
        ratings: [...ratings, newRating],
      },
    };
  })
);
