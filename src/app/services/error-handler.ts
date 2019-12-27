import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errMsg = '';
                    if (error.error instanceof ErrorEvent) {
                        errMsg = 'Client Side Error';
                    } else {
                        errMsg = `Error Code:${error.status}, Message:${error.statusText}`;
                    }
                    return throwError(errMsg);
                })
            );
    }
}
