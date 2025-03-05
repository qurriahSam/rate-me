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
  ratings: { id: string; rate: number }[];
  displayName: string;
}

export const ProjectAction = createActionGroup({
  source: 'Projects',
  events: {
    'Upload Project': props<IProject>(),
    'Upload Project Success': props<Project>(),
    'Project Error': props<{ error: String | null }>(),
    'Get All Projects': emptyProps,
    'Get All Projects Success': props<{ projects: Project[] }>(),
    'Get User Projects': props<String>(),
    'Get User Projects Success': props<{ projects: Project[] }>(),
  },
});
