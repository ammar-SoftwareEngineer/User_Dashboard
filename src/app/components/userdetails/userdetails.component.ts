import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css'],
})
export class UserdetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _UserService: UserService,
    private _Router: Router
  ) {}
  id: any;
  data: User = {} as User;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        this._UserService.getUsersDetails(this.id).subscribe({
          next: (response) => {
            this.data = response.data;
            console.log(this.data);
          },
        });
      },
    });
  }

  back(): void {
    this._Router.navigate(['/home']);
  }
}
