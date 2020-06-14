import { Component, ChangeDetectionStrategy } from '@angular/core'

@Component({
    selector: 'oc-auth-unauthorized',
    templateUrl: './unauthorized.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnauthorizedComponent { }
