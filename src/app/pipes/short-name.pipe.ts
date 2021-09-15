import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortName',
})
export class GetShortName implements PipeTransform {
  transform(value: string): string {
    var text_arr = value.split(' ');
    return text_arr[0] + ' ' + text_arr[text_arr.length - 1];
  }
}
