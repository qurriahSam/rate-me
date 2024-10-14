import { createReducer, on } from '@ngrx/store';
import { User, UserStateInterface } from '../../models/loggedUser';
import { RegisterAction } from './actions';

const initialState: UserStateInterface = {
  isLoading: false,
  loggedUser: { email: null, id: null },
  error: null,
};

export const registerReducer = createReducer(
  initialState,
  on(RegisterAction.registerUser, (_state) => ({ ..._state, isLoading: true })),
  on(RegisterAction.registrationSuccess, (_state, action) => ({
    ..._state,
    isLoading: false,
    loggedUser: { email: action.email, id: action.id },
    error: null,
  })),
  on(RegisterAction.loginUser, (_state, action) => ({
    ..._state,
    isLoading: true,
  })),
  on(RegisterAction.registrationError, (_state, action) => ({
    ..._state,
    error: action.error,
    isLoading: false,
    loggedUser: { email: null, id: null },
  }))
);
