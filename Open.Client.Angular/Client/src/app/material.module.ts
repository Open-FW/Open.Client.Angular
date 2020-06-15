import { NgModule } from '@angular/core'

import { FlexLayoutModule } from '@angular/flex-layout'
import { MatSnackBarModule } from '@angular/material/snack-bar'

const modules = [
    FlexLayoutModule,
    MatSnackBarModule
]

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule {

}
