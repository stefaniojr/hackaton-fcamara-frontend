import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'turnoText',
})
export class GetTurnoText implements PipeTransform {
  transform(value: string): string {
    if (value === 'M') {
      return 'Manhã';
    } else if (value === 'T') {
      return 'Tarde';
    } else if (value === 'A'){
      return 'Ambos';
    }
    return '';
  }
}
