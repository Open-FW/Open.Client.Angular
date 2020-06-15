import { TestBed, async } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { TranslateTestingModule } from 'ngx-translate-testing'
import { RootComponent } from './root.component'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Store } from './store/store.service'

describe('RootComponent', () => {
    const snackBarMock = {
        open: jest.fn()
    }

    const storeMock = {
        messages$: jest.fn(),
        errors$: jest.fn()
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                TranslateTestingModule.withTranslations({})
            ],
            declarations: [
                RootComponent
            ],
            providers: [
                { provide: Store, useValue: storeMock },
                { provide: MatSnackBar, useValue: snackBarMock }
            ]
        }).compileComponents()
    })

    it('should create the app', () => {
        const fixture = TestBed.createComponent(RootComponent)
        const app = fixture.componentInstance
        expect(app).toBeTruthy()
    })
})
