import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], field: string, value: string): any {
    if (!value) {
      return items;
    }

    if (!items) {
      return [];
    }

    return items.filter(item => item[field].toString().startsWith(value));
  }
}
