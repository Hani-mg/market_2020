import { AuthenticationService } from '../authentication/authentication.service';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
  } from '@angular/common/http';

import { throwError } from 'rxjs';
import { Injectable, Injector } from '@angular/core';

import { retry, catchError, map } from 'rxjs/operators';
import { LoadingSpinnerService } from '../loading-spinner.service';
import { Observable } from 'rxjs';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor( 
    private injector: Injector,
    private loadingSpinner : LoadingSpinnerService) {}

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth= this.injector.get(AuthenticationService);// Get the auth token from the service.
    const authToken = auth.getAuthorizationToken();
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
        headers: req.headers.set('Authorization', authToken)
        // headers: req.headers.set('DDP_X_HEADER', authToken)
    });
    // console.log( ' header DDP_X_HEADER ',authReq.headers.get('DDP_X_HEADER'));
    if (!req.headers.has('Content-Type')) {
        req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }
    // send cloned request with header to the next handler.
    return next.handle(authReq)
    .pipe(
      // retry(1),
      map((event: HttpEvent<any>) => {
          // this.loadingSpinner.dismiss();
          return event;
        })
  );
  }
}