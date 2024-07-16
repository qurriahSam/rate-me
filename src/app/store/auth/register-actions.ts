import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoggedUser, RegisterUser } from '../../models/loggedUser';

export const RegisterAction = createActionGroup({
  source: 'Register',
  events: {
    'Register User': props<RegisterUser>(),
    'Registration Success': props<LoggedUser>(),
    'Registration Error': props<{ error: string | null }>(),
  },
});
