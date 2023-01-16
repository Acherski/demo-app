import { Injectable } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Mode } from './model';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private fb: NonNullableFormBuilder) {}

  public createDateForm() {
    return this.fb.group({
      dateControl: this.fb.control<string>('', [
        // Validators.pattern(
        //   '^d{4}[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])$'
        // ),
      ]),
    });
  }

  public createThemeModeForm() {
    return this.fb.group({
      modeControl: this.fb.control<Mode>({ mode: 'LIGHT', name: 'JASNY' }),
    });
  }
}
