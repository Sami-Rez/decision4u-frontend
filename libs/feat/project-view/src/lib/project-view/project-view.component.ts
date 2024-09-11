import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '@app/data/project';
import {
  MatCell, MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'lib-project-view',
  standalone: true,
  imports: [
    CommonModule,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatCardContent,
    MatCardTitle,
    MatCard,
    MatDivider
  ],
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.css',
})
export class ProjectViewComponent implements OnInit {

  @Input() project!: Project;
  displayedColumns: string[] = ['alternative', 'score'];
  criteriaColumns: string[] = ['criteria'];

  dataSource: { alternative: string, score: number }[] = [];
  criteriaSource: { criteria: string }[] = [];

  ngOnInit(): void {
    if (this.project.scores) {
      this.dataSource = this.project.alternatives
        .map((alternative, index) => ({
        alternative,
        score: this.project.scores[index]
      })).sort((a, b) => b.score - a.score);

      this.criteriaSource = this.project.criteria
        .map(criteria => ({ criteria }));
    }
  }

}
