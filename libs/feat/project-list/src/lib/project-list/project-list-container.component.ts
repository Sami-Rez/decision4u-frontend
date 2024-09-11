import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list.component';
import { ActivatedRoute } from '@angular/router';
import { LoginView } from '@app/data/user';

@Component({
  selector: 'lib-project-list-container',
  standalone: true,
  imports: [CommonModule, ProjectListComponent],
  template: `
    <lib-project-list
      [name]="loginView.authUser.firstName"
      [createdProjects]="loginView.createdProjects"
      [invitedProjects]="loginView.invitedProjects"
      [votedProjects]="loginView.votedProjects"
    ></lib-project-list>
  `,
  styles: ``,
})
export class ProjectListContainerComponent {

  loginView: LoginView;

  route = inject(ActivatedRoute);

  constructor() {
    this.route.data.subscribe(({ loginView }) => {
      this.loginView = loginView;

      console.log('ProjectListContainer#ctor', this.loginView);
    });
  }
}
