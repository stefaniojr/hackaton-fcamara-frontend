import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SPText',
})
export class GetSPText implements PipeTransform {
  transform(value: string): string {
    if (value === 'SP') {
      return 'São Paulo';
    } else {
      return 'Santos';
    }
  }
}
