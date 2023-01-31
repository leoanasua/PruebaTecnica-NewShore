import {
  HttpErrorResponse, HttpEvent, HttpHandler,
  HttpInterceptor, HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem("auth_token");
    if (idToken) {
      const requestCloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${idToken}`
        }
      });
      return next.handle(requestCloned).pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.body) {
              let response = event.body;
              if (response.error) {
                this.router.navigate(['/']);
              }
            }
          }
        }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/']);
            }
          }
        })
      )
    } else {
      return next.handle(req);
    }
  }
}