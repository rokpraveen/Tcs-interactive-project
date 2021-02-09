import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( e => 
     (e.Name.toLowerCase().includes(searchText) || e.experience.toLowerCase().includes(searchText) || e.empid.toString().includes(searchText))
);
   }
}