import { Injectable } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private fb: NonNullableFormBuilder) {}

  public createForm() {
    return this.fb.group({
      date: this.fb.control<string>('', [
        Validators.pattern(
          '^d{4}[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])$'
        ),
      ]),
    });
  }
}
