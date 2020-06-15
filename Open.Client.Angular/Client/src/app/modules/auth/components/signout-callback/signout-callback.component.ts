import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'

@Component({
    selector: 'oc-auth-signout-callback',
    templateUrl: './signout-callback.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignoutCallbackComponent implements OnInit {
    constructor(
        private readonly router: Router,
        private readonly authService: AuthService
    ) { }

    async ngOnInit(): Promise<void> {
        await this.authService.signoutComplete()
        this.router.navigate(['/'])

        console.log('SIGNOUT COMPLETE')
    }
}
