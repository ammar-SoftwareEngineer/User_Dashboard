import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, map, Observable, of, shareReplay, tap } from 'rxjs';
import { CachService } from './cach.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _HttpClient: HttpClient) {}

  getAllUsers(page: number = 1): Observable<any> {
    return this._HttpClient.get(`https://reqres.in/api/users?page=${page}`);
  }

  getUsersDetails(id: string): Observable<any> {
    return this._HttpClient.get(` https://reqres.in/api/users/${id}`);
  }
}
