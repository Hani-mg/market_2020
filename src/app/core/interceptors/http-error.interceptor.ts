// https://www.freakyjolly.com/ionic-4-make-http-calls-and-handle-responses-easily-using-an-interceptor/#.X6mPr2gzZPY
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';


import { ToastController } from '@ionic/angular';
import { Injectable, Injector } from '@angular/core';

import { LoadingController } from '@ionic/angular';
import { LoadingSpinnerService } from '../loading-spinner.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    loaderToShow: any;
 constructor( 
     private injector: Injector,
     public loadingController: LoadingController,
     private loadingSpinner : LoadingSpinnerService,
     private translate: TranslateService
     ) {}
intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this.showLoader();
    // this.loadingSpinner.present();
    
    const authReq = request.clone({
        setHeaders: {
            'Cache-control': 'no-cache',
            // 'Cache-control': 'no-store',
            'Expire': '0',
            'Pragma': 'no-cache'
          }
    });
    return next.handle(authReq)
    .pipe(
        // retry(1),
        map((event: HttpEvent<any>) => {
            setTimeout(() => {
                this.loadingSpinner.dismiss();
              }, 1500);
            
            return event;
          }),
        catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors such as network issues and JavaScript syntax and type errors. These errors return ErrorEvent objects.
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side errors such as code errors in the server and database access errors. These errors return HTTP Error Responses.
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
        }
        this.translate.get(error.error.message).subscribe( value => {
            this.presentToast(value);
            }
        );
        return throwError(errorMessage);
        })
    );
}
async presentToast(messageError) {
    const toastCtrl= this.injector.get(ToastController);

    const toast = await toastCtrl.create({
        header: ' ',
        message: messageError,

        duration: 2000,
        });
    toast.present();
    }

}