import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStep, MatStepLabel, MatStepper } from '@angular/material/stepper';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'lib-assessment-stepper',
  standalone: true,
  imports: [
    CommonModule,
    MatStep,
    MatStepper,
    MatRadioButton,
    MatRadioGroup,
    MatButton,
    MatStepLabel
  ],
  templateUrl: './assessment-stepper.component.html',
  styleUrl: './assessment-stepper.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentStepperComponent implements OnChanges, AfterViewInit {

  @Input() alternatives: string[] = [];
  @Input() criteria: string[] = [];
  @Output() change = new EventEmitter<number[][]>();
  @ViewChild('stepper') stepper!: MatStepper;

  assessmentMatrix: number[][] = [];

  ngAfterViewInit() {
    // this.initializeMatrix();
  }

  ngOnChanges() {
    // Ensure matrix initialization also reacts to input changes if necessary
    this.assessmentMatrix = [];
    this.initializeMatrix();
    this.change.emit(this.assessmentMatrix);
  }

  initializeMatrix() {
    this.assessmentMatrix = Array(this.alternatives.length)
      .fill(null)
      .map(() => Array(this.criteria.length).fill(0));
  }

  rate(criterionIndex: number, rating: number) {
    this.assessmentMatrix[this.stepper.selectedIndex][criterionIndex] = rating;
    this.change.emit(this.assessmentMatrix);
  }

  moveToNext() {
    this.stepper.next();
  }

  // isLastStep(): boolean {
  //   return this.myStepper?.selectedIndex === this.myStepper?.steps?.length - 1;
  // }

  // submitAssessment() {
  //   this.completed.emit(this.assessmentMatrix);
  // }

  allCriteriaRated(): boolean {
    // Check if all criteria for the current step have been rated
    return this.assessmentMatrix[this.stepper?.selectedIndex]?.every(
      (rating) => rating > 0
    );
  }

  // allStepsCompleted(): boolean {
    // Check if all steps have been completed
    // return this.assessmentMatrix.every((alternative) =>
    //   alternative.every((rating) => rating > 0)
    // );
  // }
}
