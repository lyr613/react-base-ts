import { BehaviorSubject, of, timer, Subject, ReplaySubject } from 'rxjs'
import { switchMap, map } from 'rxjs/operators'

export const BarIndexUpdater$ = new Subject<number>()
/** 选中打标签的下标 0-2 */
export const BarIndex$ = new ReplaySubject(1)

const t1$ = of({
    thead: ['1a', '2b', '3c'],
    tbody: [['1', '2', '3'], ['2', '5', '6'], ['3', '8', '9'], ['4', '5', '1'], ['5', '5', '5']],
})
const t2$ = of({
    thead: ['q', 'w', 'e'],
    tbody: [
        ['qqq', 'www', 'eee'],
        ['q2', 'www', 'eee'],
        ['q3', 'www', 'eee'],
        ['q4', 'www', 'eee'],
        ['q5', 'www', 'eee'],
    ],
})
const t3$ = of({
    thead: ['我', '你', '他'],
    tbody: [
        ['我1', 'www', 'eee'],
        ['我3', 'www', 'eee'],
        ['我4', 'www', 'eee'],
        ['我5', 'www', 'eee'],
        ['我6', 'www', 'eee'],
    ],
})

BarIndexUpdater$.pipe(switchMap((i) => timer(0, 4000).pipe(map((j) => (i + j) % 3)))).subscribe(BarIndex$)
export const Tabel$ = BarIndex$.pipe(
    switchMap((i) => {
        if (i === 0) {
            return t1$
        }
        if (i === 1) {
            return t2$
        }
        return t3$
    }),
    switchMap((res) =>
        timer(0, 2000).pipe(
            map((i) => {
                const j = i % 2
                const { thead, tbody } = res
                return {
                    thead,
                    tbody: tbody.slice(3 * j, 3 * j + 3),
                }
            }),
        ),
    ),
)
