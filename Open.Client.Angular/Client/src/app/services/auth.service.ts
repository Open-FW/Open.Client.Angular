import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { environment } from 'src/environments/environment'

import { User, UserManager } from 'oidc-client'

@Injectable({ providedIn: 'root' })
export class AuthService {
    private authStateSubject = new BehaviorSubject<boolean>(false)
    public authState = this.authStateSubject.asObservable()

    private userSubject = new BehaviorSubject<User>(null)
    public user$ = this.userSubject.asObservable()

    private manager = new UserManager({
        authority: environment.oidc.authority,
        client_id: environment.oidc.clientId,
        redirect_uri: `${environment.oidc.redirectUri}`,
        post_logout_redirect_uri: `${environment.oidc.postLogoutRedirectUri}`,
        response_type: `${environment.oidc.responseType}`,
        scope: `${environment.oidc.scope}`,
        filterProtocolClaims: true,
        automaticSilentRenew: true,
        loadUserInfo: true
    })

    private user: User | null

    constructor() {
        this.manager.getUser().then(user => {
            this.user = user
            this.userSubject.next(user)
            this.authStateSubject.next(this.isAuthenticated)
        })
    }

    public signin(redirectUri: string): Promise<void> {
        return this.manager.signinRedirect({
            data: {
                redirect_url: redirectUri
            }
        })
    }

    public signout(): Promise<void> {
        return this.manager.signoutRedirect()
    }

    async signinComplete(): Promise<void> {
        this.user = await this.manager.signinRedirectCallback()
        this.userSubject.next(this.user)
        this.authStateSubject.next(this.isAuthenticated)
    }

    async signoutComplete(): Promise<void> {
        await this.manager.signoutRedirectCallback()
        await this.manager.clearStaleState()

        this.authStateSubject.next(this.isAuthenticated)
    }

    get state(): any {
        return this.user?.state
    }

    get isAuthenticated(): boolean {
        return this.user != null && !this.user.expired
    }

    get authorizationHeaderValue(): string {
        return this.user ? `${this.user.token_type} ${this.user.access_token}` : ''
    }

    get name(): string {
        console.log('user', this.user)
        return this.user?.profile?.name ?? ''
    }
}
