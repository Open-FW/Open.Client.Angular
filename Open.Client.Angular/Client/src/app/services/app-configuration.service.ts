import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { EMPTY } from 'rxjs'
import { tap, catchError } from 'rxjs/operators'

declare var window: any

export class Config {
    authIssuerUrl: string
    graphqlUrl: string
    api: string
}

@Injectable()
export class AppConfigService {
    constructor(private http: HttpClient) { }

    public loadConfig() {
        return this.http.get<Config>('/config').pipe(
            tap(config => window.config = config),
            catchError(() => EMPTY)
        ).toPromise()
    }
}
