import { NgModule } from '@angular/core'

import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'


const modules = [
    MatProgressBarModule,
    MatSidenavModule,
    MatListModule
]

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule {

}
