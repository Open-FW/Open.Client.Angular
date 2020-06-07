import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MainPageComponent } from './main.page'
import { MainRoutingModule } from './main.routing'
import { LayoutComponent } from './containers/layout/layout.component'


@NgModule({
    declarations: [
        LayoutComponent,
        MainPageComponent
    ],
    imports: [
        CommonModule,

        MainRoutingModule
    ]
})
export class MainModule { }
