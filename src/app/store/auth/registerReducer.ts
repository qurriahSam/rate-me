import { createReducer, on } from '@ngrx/store';
import { RegisterUserStateInterface } from '../../models/loggedUser';
import { RegisterAction } from './registerActions';

const initialState: RegisterUserStateInterface = {
  isLoading: false,
  loggedUser: { email: '', password: '' },
  error: null,
};

export const registerReducer = createReducer(
  initialState,
  on(RegisterAction.registerUser, (_state) => ({ ..._state, isLoading: true }))
);
