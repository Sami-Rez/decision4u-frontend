import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginView } from '@app/data/user';
import { Project } from '@app/data/project';
import { ProjectViewComponent } from '@app/feat/project-view';

@Component({
  selector: 'lib-project-create-container',
  standalone: true,
  imports: [CommonModule, ProjectViewComponent],
  template: `
    <lib-project-view
      [project]="project"
    ></lib-project-view>`,
  styles: ``,
})
export class ProjectViewContainerComponent{

  project: Project;

  route = inject(ActivatedRoute);
  router = inject(Router);

  constructor() {
    this.route.data.subscribe(({ loginView }) => {
      const projectId = this.route.snapshot.params['id'];

      // Attempt to find the project in both created and invited lists
      this.project = ((loginView as LoginView).createdProjects.find(project => project.id === projectId) ||
        (loginView as LoginView).votedProjects.find(project => project.id === projectId)) as Project;

      if (!this.project) {
        console.error('Project not found');
        this.router.navigate(['/']);
      }

      console.log('ProjectViewContainerComponent', projectId, this.project);
    });
  }
}
