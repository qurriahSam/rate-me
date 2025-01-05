import { createReducer, on } from '@ngrx/store';
import { ProjectAction } from './project-actions';
import { ProjectStore } from '../../models/project';

const initialState: ProjectStore = {
  isLoading: false,
  projects: [],
  userProjects: [],
  error: null,
};

export const projectsReducer = createReducer(
  initialState,
  on(ProjectAction.loadProject, (_state) => ({ ..._state, isLoading: true })),
  on(ProjectAction.uploadProject, (_state, props) => {
    const { image, repoUrl, title, description, tags, demoUrl } = props;
    const nuProject = {
      title: title,
      description: description,
      tags: tags,
      demoUrl: demoUrl,
      repoUrl: repoUrl,
      image: image,
    };
    _state.userProjects.push(nuProject);
    return _state;
  })
);
