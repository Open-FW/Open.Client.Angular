import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'

@Component({
    selector: 'oc-auth-signin-callback',
    templateUrl: './signin-callback.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninCallbackComponent implements OnInit {
    constructor(
        private readonly router: Router,
        private readonly authService: AuthService
    ) { }

    async ngOnInit(): Promise<void> {
        await this.authService.signinComplete()
        this.router.navigate([this.authService.state.redirect_url])

        console.log('SIGNIN COMPLETE')
    }
}
