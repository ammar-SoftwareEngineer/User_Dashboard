import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { CachService } from '../services/cach.service';

@Injectable()
export class HttpcachInterceptor implements HttpInterceptor {
  constructor(private _CachService: CachService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.method !== 'GET') {
      return next.handle(request);
    }
    let cachResponse = this._CachService.get(request.url);
    if (cachResponse) {
      return of(cachResponse);
    }
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        this._CachService.put(request.url, event);
      })
    );
  }
}
