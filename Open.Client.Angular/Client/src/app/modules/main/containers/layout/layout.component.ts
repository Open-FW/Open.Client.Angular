import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'

import { interval, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Store } from 'src/app/store/store.service'
import { AuthService } from 'src/app/services/auth.service'
import { EntityGraphQLService } from 'src/app/services/entity-graphql.service'

import gql from 'graphql-tag'

const GET_POKEMONS = gql`
    query ($first: Int!) {
        pokemons(first: $first) {
            id
            name
        }
    }
`
export interface Pokemon {
    id: string
    name: string
}

const GET_CURRENT_USER = gql`
    query {
        currentUser @client {
            name
            email
        }
    }
`
export interface CurrentUser {
    name: string
}

@Component({
    selector: 'oc-main',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
    title: 'Client'

    name$: Observable<string>

    loading$: Observable<number>

    constructor(private readonly authService: AuthService, private readonly entityService: EntityGraphQLService, private readonly store: Store) {

    }

    ngOnInit(): void {
        this.loading$ = this.store.loading$
        this.name$ = this.entityService.load<{ currentUser: CurrentUser }, string>({ query: GET_CURRENT_USER }, null, (data) => data.currentUser?.name)

        const interv$ = interval(10000).pipe(
            map(i => ({ first: i }))
        )
        this.entityService.fetch<Pokemon[]>({ query: GET_POKEMONS, variables: { first: 6 } }).subscribe(console.log)
    }

    message() {
        this.store.dispatchMessage({ text: 'MUHAHAHAHA', level: 'success' })
    }

    async logout() {
        await this.authService.signout()
    }
}
