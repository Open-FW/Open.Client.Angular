import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MainPageComponent } from './main.page'

const routes: Routes = [
    {
        path: '', component: MainPageComponent, pathMatch: 'full', children: [

        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
