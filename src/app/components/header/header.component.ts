import { Component, Input } from '@angular/core';
import { SearchPipe } from 'src/app/shared/pipe/search.pipe';
import { SearchService } from 'src/app/shared/services/search.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private _SearchService: SearchService,
    private _UserService: UserService
  ) {}
  searchText: string = '';
  data: User[] = [];
  onSearch(): void {
    this._SearchService.setSearchQuery(this.searchText);
  }
}
