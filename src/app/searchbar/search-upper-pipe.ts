import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperFullName'
})
export class SearchUpperPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args) return value;

    args = args.toUpperCase();

    return value.filter((item: any) => {
      return JSON.stringify(item).toUpperCase().includes(args);
    })
  }

}