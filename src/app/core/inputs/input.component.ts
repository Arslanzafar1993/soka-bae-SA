import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'anosrv-input',
  template: `
    <div [formGroup]="form">
      <input type="search" [id]="controlName" [formControlName]="controlName" [maxlength]="maxLength">
    </div>
  `
})
export class InputComponent {

  @Input() controlName: string;
  @Input() maxLength: number;
  @Input() form: FormGroup;

  constructor() {
  }
}
