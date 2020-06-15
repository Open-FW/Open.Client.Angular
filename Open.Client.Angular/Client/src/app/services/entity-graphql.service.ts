import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { Observable, of } from 'rxjs'
import { map, switchMap, tap, finalize } from 'rxjs/operators'
import { QueryOptions, WatchQueryOptions, MutationOptions } from 'apollo-client'
import { Store } from '../store/store.service'
import { GraphQLError } from 'graphql'

@Injectable({ providedIn: 'root' })
export class EntityGraphQLService {
    constructor(private readonly apollo: Apollo, private readonly store: Store) {
    }

    public fetch<T>(options: QueryOptions, vars$?: Observable<{ [key: string]: any }>): Observable<T>
    public fetch<T, R>(options: QueryOptions, vars$?: Observable<{ [key: string]: any }>, mapFn?: (data: T, loading?: boolean) => R): Observable<R>
    public fetch<T, R = T>(options: QueryOptions, vars$?: Observable<{ [key: string]: any }>, mapFn?: (data: T, loading?: boolean) => R): Observable<R> {
        return (vars$ ?? of(null)).pipe(
            map(vars => vars ?? {}),
            tap(_ => this.store.dispatchLoading()),
            switchMap(vars => this.apollo.query<T>({ errorPolicy: 'all', ...options, variables: { ...(options.variables ?? {}), ...vars } })),
            tap(({ errors }) => this.catchGraphQLErrors(errors)),
            map(({ data, loading }) => mapFn ? mapFn(data || {} as T, loading) : data as any),
            finalize(() => {
                this.store.dispatchLoadingFinished()
            })
        )
    }

    public load<T>(options: WatchQueryOptions, vars$?: Observable<{ [key: string]: any }>): Observable<T>
    public load<T, R>(options: WatchQueryOptions, vars$?: Observable<{ [key: string]: any }>, mapFn?: (data: T, loading?: boolean) => R): Observable<R>
    public load<T, R = T>(options: WatchQueryOptions, vars$?: Observable<{ [key: string]: any }>, mapFn?: (data: T, loading?: boolean) => R): Observable<R> {
        return (vars$ ?? of(null)).pipe(
            map(vars => vars ?? {}),
            switchMap(vars => this.apollo.watchQuery<T>({ errorPolicy: 'all', ...options, variables: { ...(options.variables ?? {}), ...vars } }).valueChanges),
            tap(console.warn),
            tap(({ errors }) => this.catchGraphQLErrors(errors)),
            map(({ data, loading }) => mapFn ? mapFn(data || {} as T, loading) : data as any),
        )
    }

    public mutate<T>(options: MutationOptions<T>, vars$?: Observable<{ [key: string]: any }>): Observable<T>
    public mutate<T, R>(options: MutationOptions<T>, vars$?: Observable<{ [key: string]: any }>, mapFn?: (data: T, loading?: boolean) => R): Observable<R>
    public mutate<T, R = T>(options: MutationOptions<T>, vars$?: Observable<{ [key: string]: any }>, mapFn?: (data: T, loading?: boolean) => R): Observable<R> {
        return (vars$ ?? of(null)).pipe(
            map(vars => vars ?? {}),
            tap(_ => this.store.dispatchLoading()),
            switchMap(vars => this.apollo.mutate<T>({ errorPolicy: 'all', ...options, variables: { ...(options.variables ?? {}), ...vars } })),
            tap(({ errors }) => this.catchGraphQLErrors(errors)),
            map(({ data }) => mapFn ? mapFn(data || {} as T) : data as any),
            finalize(() => {
                this.store.dispatchLoadingFinished()
            })
        )
    }

    private catchGraphQLErrors(errors: readonly GraphQLError[]) {
        if (errors && errors.length) {
            const error = errors[0]

            if (error?.extensions?.code === 'AUTH_NOT_AUTHORIZED') {
                return
            }

            this.store.dispatchError(error)
        }
    }
}
