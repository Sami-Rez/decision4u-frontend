import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { ProjectCreateFormData } from '../model/create-project.model';
import { MatChipGrid, MatChipInput, MatChipRow } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { CustomValidators } from '@app/util';
import { AssessmentStepperComponent } from '../assessment-stepper/assessment-stepper.component';
import { ChipListComponent } from '@app/ui/chip-list';
import { ChipListAutocompleteComponent } from '@app/ui/chip-list-autocomplete';

@Component({
  selector: 'lib-project-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatError,
    MatChipGrid,
    MatChipRow,
    MatChipInput,
    MatIcon,
    ChipListComponent,
    ChipListAutocompleteComponent,
    AssessmentStepperComponent,
  ],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css'
})
export class ProjectCreateComponent {

  @Input() voters: string[] = [];
  @Output() projectCreate = new EventEmitter<ProjectCreateFormData>();

  updatedAlternatives: string[] = [];
  updatedCriteria: string[] = [];
  showStepper = true;

  alternativeJudgments: number[][] = [];

  projectForm = inject(FormBuilder).nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required]],
    alternatives: [[] as string[], [CustomValidators.minLength(1)]],
    criteria: [[] as string[], [CustomValidators.minLength(1)]],
    voters: [[] as string[], [CustomValidators.minLength(1)]]
  });

  constructor() {
    this.projectForm.controls.alternatives.valueChanges.subscribe(values => {
      this.updatedAlternatives = [...values];
      this.refreshStepper();
    });

    this.projectForm.controls.criteria.valueChanges.subscribe(values => {
      this.updatedCriteria = [...values];
      this.refreshStepper();
    });
  }

  onSubmit(): void {
    this.projectCreate.emit({
      ...this.projectForm.value,
      alternativeJudgements: this.alternativeJudgments
    } as ProjectCreateFormData);
  }

  onAssessmentChanged(assessment: number[][]) {
    console.log('Assessment changed', assessment);
   this.alternativeJudgments = assessment;
  }

  hasEnoughAlternativesAndCriteria(): boolean {
    const alternatives = this.projectForm.controls.alternatives.value;
    const criteria = this.projectForm.controls.criteria.value;
    return alternatives.length >= 2 && criteria.length >= 2;
  }

  allStepsCompleted(): boolean {
    return this.alternativeJudgments.every((alternative) =>
      alternative.every((rating) => rating > 0)
    );
  }

  private refreshStepper() {
    this.showStepper = false;
    setTimeout(() => {
      this.showStepper = true;
    }, 0);
  }


}
