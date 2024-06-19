import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterUserStateInterface } from '../../models/loggedUser';

export const RegisterAction = createActionGroup({
  source: 'Register',
  events: {
    'Register User': emptyProps(),
    'Registration Success': props<RegisterUserStateInterface>(),
    'Registration Error': props<{ error: string }>(),
  },
});
