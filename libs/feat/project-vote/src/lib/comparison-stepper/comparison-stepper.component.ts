import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStep, MatStepLabel, MatStepper, MatStepperNext } from '@angular/material/stepper';
import { MatButton } from '@angular/material/button';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';

@Component({
  selector: 'lib-comparison-stepper',
  standalone: true,
  imports: [
    CommonModule,
    MatStepper,
    MatStep,
    MatButton,
    MatSlider,
    MatSliderThumb,
    MatStepLabel,
    MatStepperNext
  ],
  templateUrl: './comparison-stepper.component.html',
  styleUrl: './comparison-stepper.component.css',
})
export class ComparisonStepperComponent {

  @Input() criteria: string[] = [];
  @Output() assessmentCompleted = new EventEmitter<number[][]>();

  @ViewChild('stepper') stepper!: MatStepper;

  assessmentMatrix: number[][] = [];

  ngOnChanges() {
    this.initializeMatrix();
  }

  ngAfterViewInit(): void {
    this.initializeMatrix();
  }

  initializeMatrix(): void {
    this.assessmentMatrix = Array(this.criteria.length)
      .fill(null)
      .map(() => Array(this.criteria.length).fill(1));
  }

  getCurrentComparisons(stepIndex: number): any[] {
    // Adjusted to use stepIndex directly for simplicity in this example
    const comparisons = [];
    // Determine which comparisons to include based on the stepIndex
    for (let i = stepIndex + 1; i < this.criteria.length; i++) {
      comparisons.push({
        criteria1: this.criteria[stepIndex],
        criteria2: this.criteria[i],
        indexes: [stepIndex, i],
      });
    }
    return comparisons;
  }

  onSliderChange(indexes: [number, number], sliderValue: number): void {
    let importanceValue;
    if (sliderValue > 0) {
      // Positive slider values directly map to importance values
      importanceValue = sliderValue + 1; // Transforms 1,2,3,4
    } else if (sliderValue < 0) {
      // Negative slider values map to reciprocal importance values
      importanceValue = 1 / Math.abs(sliderValue - 1); // Transforms -1,-2,-3,-4 to 1/2, 1/3, 1/4, 1/5
    } else {
      // Slider value of 0 indicates equal importance
      importanceValue = 1;
    }

    const [row, col] = indexes;

    this.assessmentMatrix[row][col] = importanceValue;
    this.assessmentMatrix[col][row] = 1 / importanceValue;

    console.log(row, col, this.assessmentMatrix);
  }

  getImportanceText(indexes: [number, number]): string {
    const [row, col] = indexes;
    const importanceValue = this.assessmentMatrix[row][col];

    // Handling values greater than 1 (less important)
    if (importanceValue === 1) {
      return 'is equal in importance to';
    } else if (importanceValue === 2) {
      return 'is a bit less important than';
    } else if (importanceValue === 3) {
      return 'is much less important than';
    } else if (importanceValue === 4) {
      return 'is very much less important than';
    } else if (importanceValue === 5) {
      return 'is greatly less important than';
    }

    // Handling reciprocal values (more important)
    else if (importanceValue === 1 / 2) {
      return 'is a bit more important than';
    } else if (importanceValue === 1 / 3) {
      return 'is much more important than';
    } else if (importanceValue === 1 / 4) {
      return 'is very much more important than';
    } else if (importanceValue === 1 / 5) {
      return 'is greatly more important than';
    }

    // Fallback for any unexpected values
    return 'has unspecified comparative importance to';
  }

  get numberOfSteps(): number {
    // Calculates the number of steps needed based on criteria
    return this.criteria.length - 1;
  }

  trackByFn(index: number, item: any): any {
    return `${item.criteria1}-${item.criteria2}`;
  }

  submitAssessment(): void {
    this.assessmentCompleted.emit(this.assessmentMatrix);
  }


}
