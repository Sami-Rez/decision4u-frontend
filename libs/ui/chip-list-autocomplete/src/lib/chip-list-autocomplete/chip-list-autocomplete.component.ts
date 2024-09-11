// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
//
// @Component({
//   selector: 'lib-chip-list-autocomplete',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './chip-list-autocomplete.component.html',
//   styleUrl: './chip-list-autocomplete.component.css',
// })
// export class ChipListAutocompleteComponent {}


import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Component, ElementRef, forwardRef, inject, Input, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'lib-chip-list-autocomplete',
  templateUrl: './chip-list-autocomplete.component.html',
  styleUrls: ['./chip-list-autocomplete.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipListAutocompleteComponent),
      multi: true,
    },
  ],
})
export class ChipListAutocompleteComponent implements ControlValueAccessor {

  @Input() label: string = '';
  @Input() allItems: string[] = []; // Items available for autocomplete


  items: string[] = []; // Selected items
  itemCtrl = new FormControl();
  filteredItems: Observable<string[]>;

  @ViewChild('itemInput') itemInput: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor() {
    this.filteredItems = this.itemCtrl.valueChanges.pipe(
      startWith(null),
      map((item: string | null) => item ? this._filter(item) : this.allItems.slice()),
    );
  }


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

    // Clear the input value
    event.chipInput!.clear();
    // Reset the input control
    this.itemCtrl.setValue(null);
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

  selected(event: MatAutocompleteSelectedEvent): void {
    this.items.push(event.option.viewValue);
    this.itemInput.nativeElement.value = '';
    this.itemCtrl.setValue(null);
    this.onChange(this.items);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allItems.filter(item =>
      item.toLowerCase().indexOf(filterValue) === 0 &&
        !this.items.includes(item));
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
