import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Message } from '../model/message.model'
import { Apollo } from 'apollo-angular'
import { Action } from './model/action.model'
import { filter, takeUntil, tap } from 'rxjs/operators'
import { GraphQLError } from 'graphql'
import { AuthService } from '../services/auth.service'
import { UnsubscribeService } from '../services/unsubscribe.service'

@Injectable({ providedIn: 'root' })
export class Store {
    private readonly errorSubject = new BehaviorSubject<GraphQLError>(null)
    private readonly messageSubject = new BehaviorSubject<Message>(null)
    private readonly loadingSubject = new BehaviorSubject<number>(0)

    private readonly actionSubject = new BehaviorSubject<Action>(null)

    constructor(private readonly apollo: Apollo, private readonly authService: AuthService, private readonly unsubService: UnsubscribeService) {
        this.authService.user$.pipe(
            filter(user => !!user),
            takeUntil(this.unsubService.unsubscriber('root'))
        )
        .subscribe(user => {
            const currentUser = {
                __typename: 'currentUser',

                email: user.profile?.email,
                name: user.profile?.name
            }

            this.storeData({ currentUser })
        })
    }

    public errors$ = this.errorSubject.asObservable().pipe(
        filter(error => !!error)
    )

    public messages$ = this.messageSubject.asObservable().pipe(
        filter(message => !!message)
    )

    public loading$ = this.loadingSubject.asObservable()

    public action$(name?: string) {
        return this.actionSubject.asObservable().pipe(
            filter(action => !!action),
            filter(({ actionName }) => !name || actionName === name)
        )
    }

    public dispatchAction(action: Action) {
        this.actionSubject.next(action)
    }

    public dispatchError(error: GraphQLError) {
        this.errorSubject.next(error)
    }

    public dispatchMessage(message: Message) {
        this.messageSubject.next(message)
    }

    public dispatchLoading() {
        this.loadingSubject.next(this.loadingSubject.value + 1)
    }

    public dispatchLoadingFinished() {
        this.loadingSubject.next(this.loadingSubject.value - 1)
    }

    public storeData<T>(data: { [key: string]: T }, id?: string): void {
        this.apollo.getClient().writeData<{ [key: string]: T }>({
            data: { ...data },
            id
        })
    }
}
