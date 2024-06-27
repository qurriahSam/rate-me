import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  RegisterUser,
  RegisterUserStateInterface,
} from '../../models/loggedUser';

export const RegisterAction = createActionGroup({
  source: 'Register',
  events: {
    'Register User': props<RegisterUser>(),
    'Registration Success': props<RegisterUserStateInterface>(),
    'Registration Error': props<{ error: string }>(),
  },
});
