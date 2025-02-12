export interface Project {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  demoUrl: string;
  repoUrl: string;
  image: string;
  userId: string;
}

export interface ProjectStateInterface {
  isLoading: boolean;
  projects: Project[];
  userProjects: Project[];
  error: null | string;
}
