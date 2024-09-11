import { Route } from '@angular/router';
import { MainShellComponent } from './main-shell.component';
import { ProjectListContainerComponent } from '@app/feat/project-list';
import { ProjectsResolver } from './resolvers/projects-resolver';
import { ProjectCreateContainerComponent } from '@app/feat/project-create';
import { ProjectVoteContainerComponent } from '@app/feat/project-vote';
import {
  ProjectViewContainerComponent
} from '../../../project-view/src/lib/project-view/project-view-container.component';

export const featureMainRoutes: Route[] = [
  {
    path: '',
    component: MainShellComponent,
    children: [
      {
        path: 'projects',
        component: ProjectListContainerComponent,
        resolve: { loginView: ProjectsResolver }
      },
      {
        path: 'projects/create',
        component: ProjectCreateContainerComponent,
        resolve: { loginView: ProjectsResolver }
      },
      {
        path: 'projects/vote/:id',
        component: ProjectVoteContainerComponent,
        resolve: { loginView: ProjectsResolver }
      },
      {
        path: 'projects/view/:id',
        component: ProjectViewContainerComponent,
        resolve: { loginView: ProjectsResolver }
      },
      { path: '**', redirectTo: 'projects' },
    ],
  },
];
