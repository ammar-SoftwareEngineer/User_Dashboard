import { query } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { SearchService } from 'src/app/shared/services/search.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private _UserService: UserService,
    private _SearchService: SearchService
  ) {}
  page: number = 0;
  totalPage: any;
  data: User[] = [];
  filteredUsers: User[] = [];
  total: number = 0;
  prePage: number = 0;
  pages: number[] = [];
  name: any;
  dataName: any[] = [];
  searchText: string = '';
  isSearch: boolean = false;
  ngOnInit(): void {
    this.searchPages();
    this.getAllUser();
  }
  getAllUser(): void {
    this._UserService.getAllUsers(this.page).subscribe({
      next: (response) => {
        this.data = response.data;
        this.filteredUsers = this.data;
        this.page = response.page;
        this.totalPage = response.total_pages;
        for (let i = 1; i <= this.totalPage; i++) {
          this.pages.push(i);
          this._UserService.getAllUsers(i).subscribe({
            next: (response) => {
              this.dataName.push(...response.data);
            },
          });
        }
        console.log(this.pages);
        this.prePage = response.per_page;
        this.total = response.total;
      },
    });
  }

  pageClicked(pageNum: number): void {
    if (pageNum !== this.page && pageNum > 0 && pageNum <= this.totalPage) {
      this.page = pageNum;
      console.log(this.page);

      this._UserService.getAllUsers(this.page).subscribe({
        next: (response) => {
          this.data = response.data;
          this.filteredUsers = this.data;
          this.prePage = response.per_page * this.page;
        },
      });
    }
  }

  searchPages(): void {
    this._SearchService.searchQuery$.subscribe((query) => {
      if (query.trim() == '') {
        this.filteredUsers = this.data;
        this.isSearch = true;
      } else {
        this.filteredUsers = this.dataName.filter((user: any) =>
          user.first_name.toLowerCase().includes(query.toLowerCase())
        );
        this.isSearch = false;
      }
    });
  }
}
