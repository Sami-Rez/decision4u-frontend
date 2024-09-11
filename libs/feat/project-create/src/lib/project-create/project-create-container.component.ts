import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectCreateComponent } from './project-create.component';
import { ProjectCreateFormData } from '../model/create-project.model';
import { LoginView } from '@app/data/user';
import { ProjectCreateCommand, ProjectService } from '@app/data/project';

@Component({
  selector: 'lib-project-create-container',
  standalone: true,
  imports: [CommonModule, ProjectCreateComponent],
  template: `
    <lib-project-create
      (projectCreate)="onCreate($event)"
      [voters]="voters">
    </lib-project-create>`,
  styles: ``,
})
export class ProjectCreateContainerComponent{

  voters: string[];
  loginView: LoginView;

  route = inject(ActivatedRoute);
  router = inject(Router);

  projectService = inject(ProjectService);


  constructor() {
    this.route.data.subscribe(({ loginView }) => {
      this.loginView = loginView;
      this.voters = (loginView as LoginView).otherUsers.map(user => user.email);
      console.log('ProjectCreateContainerComponent#ctor', this.voters);
    });
  }

  onCreate(formData: ProjectCreateFormData) {
    const command: ProjectCreateCommand = {
      ...formData,
      votersIds: this.voters.map(email =>
        this.loginView.otherUsers.find(user => user.email === email)!.id),
    };

    // TODO show snackbar
    this.projectService.create(command).finally(() =>
      this.router.navigate(['/projects'])
    )
  }
}
