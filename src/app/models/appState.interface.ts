import { UserStateInterface } from './loggedUser';
import { ProjectStateInterface } from './project';

export interface AppStateInterface {
  auth: UserStateInterface;
  projects: ProjectStateInterface;
}
