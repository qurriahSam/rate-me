import { UserStateInterface } from './loggedUser';
import { ProjectStateInterface, ViewProjectStateInterface } from './project';

export interface AppStateInterface {
  auth: UserStateInterface;
  projects: ProjectStateInterface;
  viewProject: ViewProjectStateInterface;
}
