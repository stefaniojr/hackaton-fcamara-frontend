import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstName'
})
export class GetFirstName implements PipeTransform
{
    transform(value: string): string {
        if (!value) { return ''; }
        return value.split(' ')[0];
      }
}