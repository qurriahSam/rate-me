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
  on(ProjectAction.uploadProject, (_state) => ({ ..._state, isLoading: true })),
  on(ProjectAction.uploadProjectSuccess, (_state, props) => {
    const { image, repoUrl, title, description, tags, demoUrl, _id, userId } =
      props;
    const nuProject = {
      _id: _id,
      title: title,
      description: description,
      tags: tags,
      demoUrl: demoUrl,
      repoUrl: repoUrl,
      image: image,
      userId: userId,
    };
    _state.userProjects.push(nuProject);
    return _state;
  })
);
