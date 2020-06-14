import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MainPageComponent } from './main.page'
import { MainRoutingModule } from './main.routing'
import { LayoutComponent } from './containers/layout/layout.component'
import { MaterialModule } from './material.module'


@NgModule({
    declarations: [
        LayoutComponent,
        MainPageComponent
    ],
    imports: [
        CommonModule,

        MainRoutingModule,
        MaterialModule
    ]
})
export class MainModule { }
