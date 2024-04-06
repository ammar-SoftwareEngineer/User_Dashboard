import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../user';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(users: User[], searchText: string): User[] {
    return users.filter((item) =>
      item.first_name
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase())
    );
  }
}
