import { createReducer, on } from '@ngrx/store';
import { User, UserStateInterface } from '../../models/loggedUser';
import { AuthAction } from './actions';

const initialState: UserStateInterface = {
  isLoading: false,
  loggedUser: { email: null, id: null },
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthAction.registerUser, (_state) => ({ ..._state, isLoading: true })),
  on(AuthAction.registrationSuccess, (_state, action) => ({
    ..._state,
    isLoading: false,
    loggedUser: { email: action.email, id: action.id },
    error: null,
  })),
  on(AuthAction.loginUser, (_state) => ({
    ..._state,
    isLoading: true,
  })),
  on(AuthAction.registrationError, (_state, action) => ({
    ..._state,
    error: action.error,
    isLoading: false,
    loggedUser: { email: null, id: null },
  })),
  on(AuthAction.logoutUser, (_state, action) => ({
    ..._state,
    isLoading: true,
  }))
);
