
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
    selector: 'oc-root',
    template: '<router-outlet></router-outlet>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent implements OnInit {
    langs = ['cs', 'en'] // TODO: Define langs somewhere else maybe

    constructor(
        private readonly translate: TranslateService
    ) {
        this.translate.setDefaultLang('en')
        this.translate.use('cs')
    }

    public ngOnInit(): void {
        const browserlang = this.translate.getBrowserLang()
        this.translate.setDefaultLang(this.langs.includes(browserlang) ? browserlang : 'en')
    }
}
