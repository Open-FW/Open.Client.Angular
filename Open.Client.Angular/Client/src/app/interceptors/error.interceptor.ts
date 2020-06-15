import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http'

import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { Store } from '../store/store.service'
import { GraphQLError } from 'graphql'
import { environment } from 'src/environments/environment'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private readonly store: Store
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(this.catchErrors())
        )
    }

    private catchErrors(): (err: any) => Observable<any> {
        return (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status !== 404 || environment.production) {
                    this.store.dispatchError(new GraphQLError(err.message))
                }
            }

            return throwError(err)
        }
    }
}
