import { Injectable } from '@angular/core';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, retry, tap, throwError, timer } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	private retryDelay = 1000;
	private retryMaxAttempts = 3;

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			retry({
				count: this.retryMaxAttempts,
				delay: (error, retryCount) => {
          console.log('retryCount', retryCount);
					if (shouldRetry(error))
						return timer(this.retryDelay * Math.pow(2, retryCount - 1));
					else return throwError(() => error);
				},
			}),
			// tap(() => console.error(`retry request ${req.url}`)),
			catchError((error) =>
				throwError(() => new Error(`request ${req.url} failed after ${this.retryMaxAttempts}`))
			)
		);
	}
}

enum HttpStatusCodes {
	BadGateway = 502,
	ServiceUnavailable = 503,
	GatewayTimeout = 504,
	// etc.
}

const retryCodes = [
	HttpStatusCodes.BadGateway,
	HttpStatusCodes.ServiceUnavailable,
	HttpStatusCodes.GatewayTimeout,
];

function shouldRetry(error: any): boolean {
	return error instanceof HttpErrorResponse &&
    retryCodes.includes(error.status);

}
