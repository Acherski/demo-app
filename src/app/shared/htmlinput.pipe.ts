import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asHTMLInputElement'
})
export class HTMLInputPipe implements PipeTransform {
  transform(value: any): HTMLInputElement {
    return value as HTMLInputElement;
  }
}
