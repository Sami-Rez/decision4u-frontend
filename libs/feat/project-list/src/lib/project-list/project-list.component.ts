import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatList, MatListItem, MatListSubheaderCssMatStyler } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { MatLine } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { Project } from '@app/data/project';

@Component({
  selector: 'lib-project-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListSubheaderCssMatStyler,
    RouterLink,
    MatListItem,
    MatList,
    MatDivider,
    MatLine,
    MatButton
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent {
  @Input() name!: string;
  @Input() createdProjects!: Project[];
  @Input() invitedProjects!: Project[];
  @Input() votedProjects!: Project[];
}
