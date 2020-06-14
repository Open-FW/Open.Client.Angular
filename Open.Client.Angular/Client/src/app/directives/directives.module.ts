import { NgModule } from '@angular/core'
import { FileDropDirective } from './file-drop/file-drop.directive'

export {
    FileDropDirective
}

const DIRECTIVES = [
    FileDropDirective
]

@NgModule({
    imports: [
    ],
    declarations: DIRECTIVES,
    exports: DIRECTIVES
})
export class DirectivesModule {}
