import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service'

@Component({
    selector: 'oc-main',
    templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {
    title: 'Client'

    name: string

    constructor(private readonly authService: AuthService) {

    }

    ngOnInit(): void {
        this.name = this.authService.name
    }

    logout() {
        this.authService.signout()
    }
}
