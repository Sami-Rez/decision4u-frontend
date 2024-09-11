import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginView } from '@app/data/user';
import { ProjectService, ProjectVoteCommand } from '@app/data/project';
import { ProjectVoteFormData } from '../model/vote-project.model';
import { ProjectVoteComponent } from './project-vote.component';

@Component({
  selector: 'lib-project-vote-container',
  standalone: true,
  imports: [CommonModule, ProjectVoteComponent],
  template: `
    <lib-project-vote
      [criteria]="criteria"
      (projectVote)="onVote($event)"
    ></lib-project-vote>`,
  styles: ``,
})
export class ProjectVoteContainerComponent {

  criteria: string[] = [];
  projectId: string;

  route = inject(ActivatedRoute);
  router = inject(Router);
  projectService = inject(ProjectService);

  constructor() {
    this.route.data.subscribe(({ loginView }) => {
      this.projectId = this.route.snapshot.params['id'];

      this.criteria = (loginView as LoginView).invitedProjects.find(
        project => project.id === this.projectId)!.criteria;

      console.log('ProjectVoteContainerComponent',this.projectId, this.criteria);
    });
  }

  onVote(formData: ProjectVoteFormData) {
    const command: ProjectVoteCommand = {
      ...formData,
      projectId: this.projectId,
    };

    // TODO show snackbar
    this.projectService.vote(command).finally(() =>
      this.router.navigate(['/projects'])
    )
  }
}
