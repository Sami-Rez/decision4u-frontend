import { Project } from '@app/data/project';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface LoginView {
  authUser: User;
  otherUsers: User[];
  createdProjects: Project[];
  invitedProjects: Project[];
  votedProjects: Project[];
}

