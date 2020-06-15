import { NgModule } from '@angular/core'

import { MatProgressBarModule } from '@angular/material/progress-bar'

const modules = [
    MatProgressBarModule
]

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule {

}
