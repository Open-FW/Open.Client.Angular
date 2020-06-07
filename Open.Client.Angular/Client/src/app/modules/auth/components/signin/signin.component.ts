import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'

@Component({
    selector: 'oc-auth-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {
    constructor(
        private readonly authService: AuthService,
        private readonly activeRoute: ActivatedRoute) { }

    async ngOnInit(): Promise<void> {
        await this.authService.signin(this.activeRoute.snapshot.queryParamMap.get('redirect'))
    }
}
