import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { SigninComponent } from './components/signin/signin.component'
import { SigninCallbackComponent } from './components/signin-callback/signin-callback.component'
import { SignoutCallbackComponent } from './components/signout-callback/signout-callback.component'
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component'
import { AuthPageComponent } from './auth.page'

const routes: Routes = [
    {
        path: '', component: AuthPageComponent, children: [
            { path: 'signin', component: SigninComponent },
            { path: 'signin-callback', component: SigninCallbackComponent },
            { path: 'signout-callback', component: SignoutCallbackComponent },
            { path: 'unauthorized', component: UnauthorizedComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
