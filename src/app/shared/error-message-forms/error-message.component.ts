import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-error-message',
  imports: [MatFormFieldModule],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent {
  controlInput = input.required<AbstractControl | null>();
  formSubmitted = input.required<boolean>();
  minLength = input<number>();
  maxLength = input<number>();
  minValue = input<number>();
  maxValue = input<number>();
}
