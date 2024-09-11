import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComparisonStepperComponent } from '../comparison-stepper/comparison-stepper.component';
import { ProjectVoteFormData } from '../model/vote-project.model';

@Component({
  selector: 'lib-project-vote',
  standalone: true,
  imports: [CommonModule, ComparisonStepperComponent],
  templateUrl: './project-vote.component.html',
  styleUrl: './project-vote.component.css',
})
export class ProjectVoteComponent {

  @Input() criteria: string[] = [];
  @Output() projectVote = new EventEmitter<ProjectVoteFormData>();

  onProjectVote(assessment: number[][]): void {
    this.projectVote.emit({ votes: assessment });
  }
}
