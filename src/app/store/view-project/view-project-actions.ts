import { createActionGroup, props } from '@ngrx/store';
import { Project } from '../../models/project';

export const viewProjectAction = createActionGroup({
  source: 'View Project',
  events: {
    'Get Project': props<{ id: string }>(),
    'Get Project Success': props<{ project: Project }>(),
    'Get Project Error': props<{ error: string | null }>(),
  },
});
