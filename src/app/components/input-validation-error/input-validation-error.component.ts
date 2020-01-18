import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-validation-error',
  templateUrl: './input-validation-error.component.html',
  styleUrls: ['./input-validation-error.component.scss'],
})
export class InputValidationErrorComponent implements OnInit {
  @Input('validationMessages') validationMessages: { type: string; message: string }[];
  @Input('inputFormControl') textInput: FormControl;

  constructor() {}

  ngOnInit() {}
}
