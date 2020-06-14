// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Oidc, Api } from './environment.base'

export const environment = {
    production: false,

    oidc: {
        authority: 'http://localhost:5000',
        clientId: 'open_client_angular',
        postLogoutRedirectUri: 'http://localhost:7200/auth/signout-callback',
        redirectUri: 'http://localhost:7200/auth/signin-callback',
        responseType: 'code',
        scope: 'openid offline_access profile email api.read'
    } as Oidc,

    api: {
        url: 'https://graphql-pokemon.now.sh'
    } as Api
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error'  // Included with Angular CLI.
