export interface Project {
  title: string;
  description: string;
  tags: string[];
  demoUrl: string;
  repoUrl: string;
  image: Blob;
}

export interface ProjectStore {
  isLoading: boolean;
  projects: Project[];
  userProjects: Project[];
  error: null | string;
}
