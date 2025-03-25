import { createReducer, on } from '@ngrx/store';
import { ProjectAction } from './project-actions';
import { ProjectStateInterface } from '../../models/project';

const initialState: ProjectStateInterface = {
  isLoading: false,
  projects: [],
  userProjects: [],
  error: null,
};

export const projectsReducer = createReducer(
  initialState,
  on(ProjectAction.uploadProject, (_state) => ({ ..._state, isLoading: true })),
  on(ProjectAction.uploadProjectSuccess, (_state, props) => {
    const {
      image,
      repoUrl,
      title,
      description,
      tags,
      demoUrl,
      _id,
      userId,
      displayName,
    } = props;
    const nuProject = {
      _id: _id,
      title: title,
      description: description,
      tags: tags,
      demoUrl: demoUrl,
      repoUrl: repoUrl,
      image: image,
      userId: userId,
      ratings: [],
      displayName: displayName,
    };
    const modUserProjects = [..._state.userProjects, nuProject];
    const modProjects = [..._state.projects, nuProject];
    return {
      ..._state,
      projects: modProjects,
      userProjects: modUserProjects,
      isLoading: false,
    };
  }),
  on(ProjectAction.getAllProjects, (_state) => ({
    ..._state,
    isLoading: true,
  })),
  on(ProjectAction.getAllProjectsSuccess, (_state, action) => ({
    ..._state,
    projects: action.projects,
    isLoading: false,
  })),
  on(ProjectAction.getUserProjects, (_state) => ({
    ..._state,
    isLoading: true,
  })),
  on(ProjectAction.getUserProjectsSuccess, (_state, action) => ({
    ..._state,
    userProjects: action.projects,
    isLoading: false,
  })),
  on(ProjectAction.deleteProject, (_state) => ({
    ..._state,
    isLoading: true,
  })),
  on(ProjectAction.deleteProjectSuccess, (_state, action) => {
    const modProjects = _state.projects.filter(
      (project) => project._id !== action.project._id
    );
    const modUserProjects = _state.userProjects.filter(
      (project) => project._id !== action.project._id
    );
    return {
      ..._state,
      projects: modProjects,
      userProjects: modUserProjects,
      isLoading: false,
    };
  }),
  on(ProjectAction.projectError, (_state, action) => ({
    ..._state,
    error: action.error,
    isLoading: false,
  }))
);
