
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Store } from './store/store.service'

import { MatSnackBar } from '@angular/material/snack-bar'
import { UnsubscribeService } from './services/unsubscribe.service'
import { takeUntil } from 'rxjs/operators'

@Component({
    selector: 'oc-root',
    template: '<router-outlet></router-outlet>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent implements OnInit, OnDestroy {
    langs = ['cs', 'en'] // TODO: Define langs somewhere else maybe

    constructor(
        private readonly translate: TranslateService,
        private readonly unsubService: UnsubscribeService,
        private readonly store: Store,
        private readonly snackbar: MatSnackBar
    ) {
        this.translate.setDefaultLang('en')
        this.translate.use('cs')
    }

    public ngOnInit(): void {
        const browserlang = this.translate.getBrowserLang()
        this.translate.setDefaultLang(this.langs.includes(browserlang) ? browserlang : 'en')

        this.store.messages$.pipe(
            takeUntil(this.unsubService.unsubscriber('root'))
        )
        .subscribe(message => {
            this.snackbar.open(message.text, null, {
                duration: 4000,
                panelClass: ['sb-' + message.level]
            })
        })

        this.store.errors$.pipe(
            takeUntil(this.unsubService.unsubscriber('root'))
        )
        .subscribe(error => {
            this.snackbar.open(error.message ?? this.translate.instant('Error.[General]'), null, {
                duration: 4000,
                panelClass: ['sb-error']
            })
        })
    }

    public ngOnDestroy(): void {
        this.unsubService.complete()
    }
}
