import { Injectable } from '@angular/core'
import { Subject, Observable } from 'rxjs'
import { filter } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class UnsubscribeService {
    private notifier = new Subject<string>()

    constructor() { }

    unsubscribe(subject: string): void {
        if (subject === null) {
            throw new Error('Subject parameter cannot be null')
        }

        this.notifier.next(subject)
    }

    unsubscriber(subject: string): Observable<string> {
        return this.notifier.asObservable().pipe(
            filter((sub) => sub === null || subject === sub)
        )
    }

    complete(): void {
        this.notifier.next(null)
        this.notifier.complete()
    }
}
