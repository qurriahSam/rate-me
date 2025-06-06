export interface Project {
  _id: string;
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

export interface ProjectStateInterface {
  isLoading: boolean;
  projects: Project[];
  userProjects: Project[];
  error: null | string;
}

export interface ViewProjectStateInterface {
  project: Project | null;
  isLoading: boolean;
  error: null | string;
}
