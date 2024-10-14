import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User, RegisterUser } from '../../models/loggedUser';

export const RegisterAction = createActionGroup({
  source: 'Register',
  events: {
    'Register User': props<RegisterUser>(),
    'Login User': props<RegisterUser>(),
    'Registration Success': props<User>(),
    'Registration Error': props<{ error: string | null }>(),
  },
});
