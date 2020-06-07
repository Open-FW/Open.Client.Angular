import { CommonModule } from '@angular/common'

import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { NgModule, APP_INITIALIZER } from '@angular/core'
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'

import { AppRoutingModule } from './app.routing'
import { RootComponent } from './root.component'
import { AppConfigService } from './services/app-configuration.service'
import { GraphQLModule } from './graphql.module'
import { AuthInterceptor } from './interceptors/auth.interceptor'
import { MainModule } from './modules/main/main.module'

export function httpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http)
}

export function initAppFactory(appConfigService: AppConfigService) {
    return () => appConfigService.loadConfig()
}


@NgModule({
    declarations: [
        RootComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CommonModule,

        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,

        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [HttpClient]
            }
        }),

        GraphQLModule
    ],
    providers: [
        AppConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: initAppFactory,
            deps: [AppConfigService],
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [RootComponent]
})
export class AppModule { }
