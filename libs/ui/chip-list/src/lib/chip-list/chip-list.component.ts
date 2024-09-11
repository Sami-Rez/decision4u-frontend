import { Component, forwardRef, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatChip,
  MatChipEditedEvent,
  MatChipGrid,
  MatChipInput,
  MatChipInputEvent,
  MatChipRow
} from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'lib-chip-list',
  standalone: true,
  imports: [
    CommonModule,
    MatFormField,
    MatChipGrid,
    MatChipRow,
    MatChipInput,
    MatIcon,
    MatChip,
    MatLabel
  ],
  templateUrl: './chip-list.component.html',
  styleUrl: './chip-list.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipListComponent),
      multi: true,
    },
  ],
})
export class ChipListComponent implements ControlValueAccessor {

  @Input() label: string = '';

  items: string[] = []; // Selected items

  addOnBlur = true;
  announcer = inject(LiveAnnouncer);
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  // Methods ---------------------------------------------------------

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add the item only if it is not empty
    if (value) {
      this.items.push(value);
      // Notify Angular about the change
      this.onChange(this.items);
      // Announce the addition to the user
      this.announcer.announce(`Added ${value}`);
    }

    // Clear the input
    event.chipInput!.clear();
    // Mark the form control as touched
    this.onTouched();
  }

  remove(item: string): void {
    const index = this.items.indexOf(item);

    if (index >= 0) {
      this.items.splice(index, 1);
      // Notify Angular about the change
      this.onChange(this.items);
      // Announce the removal to the user
      this.announcer.announce(`Removed ${item}`);
    }

    // Mark the form control as touched
    this.onTouched();
  }

  edit(item: string, event: MatChipEditedEvent): void {
    const value = event.value.trim();

    if (!value) {
      // `remove` already calls onChange, so no need to call it again here
      this.remove(item);
      return;
    }

    const index = this.items.indexOf(item);
    if (index >= 0) {
      this.items[index] = value;
      // Notify Angular's form control about the change
      this.onChange(this.items);
      // Announce the change to the user
      this.announcer.announce(`Edited value to ${value}`);
    }

    // Mark the form control as touched
    this.onTouched();
  }


  // ControlValueAccessor methods -----------------------------------

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(obj: any): void {
    if (obj && Array.isArray(obj)) {
      this.items = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implement this if the component should respond to being disabled
  }
}
