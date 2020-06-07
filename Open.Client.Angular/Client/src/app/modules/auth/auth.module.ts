import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AuthRoutingModule } from './auth.routing'

import { SigninComponent } from './components/signin/signin.component'
import { SignoutCallbackComponent } from './components/signout-callback/signout-callback.component'
import { SigninCallbackComponent } from './components/signin-callback/signin-callback.component'
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component'
import { AuthPageComponent } from './auth.page'

@NgModule({
    declarations: [
        AuthPageComponent,

        SigninComponent,
        SigninCallbackComponent,
        SignoutCallbackComponent,
        UnauthorizedComponent
    ],
    imports: [
        CommonModule,

        AuthRoutingModule
    ]
})
export class AuthModule { }
