import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Project } from '../../models/project';

export const ProjectAction = createActionGroup({
  source: 'Projects',
  events: {
    'Load Project': emptyProps,
    'Upload Project': props<Project>(),
  },
});
