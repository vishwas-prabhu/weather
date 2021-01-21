import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conversion'
})
export class ConversionPipe implements PipeTransform {

  transform(value: number, unit: string): any {
    if (unit === 'cel') {
      return (value - 273.15).toFixed(0);
    } else if (unit === 'fer') {
      return ((value - 273.15) * (9 / 5) + 32).toFixed(0);
    }
  }

}
