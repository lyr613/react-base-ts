import { BehaviorSubject } from 'rxjs'
import { switchMap, map } from 'rxjs/operators'

interface user {
    id: string
}
export const user_li$ = new BehaviorSubject<user[]>([])

export const user_use_id$ = new BehaviorSubject('')

export const user_use$ = user_li$.pipe(switchMap((li) => user_use_id$.pipe(map((id) => li.find((v) => v.id === id)))))
