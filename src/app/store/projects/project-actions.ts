import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Project } from '../../models/project';

interface IProject {
  title: string;
  description: string;
  tags: string[];
  demoUrl: string;
  repoUrl: string;
  image: string;
  userId: string;
}

export const ProjectAction = createActionGroup({
  source: 'Projects',
  events: {
    'Upload Project': props<IProject>(),
    'Upload Project Success': props<Project>(),
    'Upload Project Error': props<{ error: String | null }>(),
  },
});
