declare var window: any

export interface Oidc {
    authority: string
    clientId: string

    redirectUri: string
    postLogoutRedirectUri: string

    responseType: string
    scope: string
}

export interface Api {
    url: string
}

export class BaseEnvironment {
    public get oidc(): Oidc {
        return (window.config || { issuer: {} }).issuer as Oidc
    }

    public get api(): Api {
        return (window.config || { api: {} }).api as Api
    }

    public production = false
}
