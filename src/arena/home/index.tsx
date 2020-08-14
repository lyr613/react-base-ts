import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'
import { useHistory } from 'react-router'
import { Subject, BehaviorSubject, fromEvent } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { switchMap, concatMap, takeUntil, map, skipUntil, zip } from 'rxjs/operators'

const source$ = new Subject<one>()
const target$ = new Subject<one>()

const li$ = new BehaviorSubject(
    Array.from({ length: 10 }, (_, i) => ({
        id: i,
        txt: 'abcdefghijklmn'[i],
    })),
)

/** Home */
export default function Home() {
    const arr = useObservable(() => li$, [])
    useEffect(() => {
        const end$ = fromEvent(document, 'dragend')
        const ob = source$
            .pipe(
                concatMap((source) =>
                    target$.pipe(
                        takeUntil(end$),
                        map((target) => [source, target]),
                    ),
                ),
                switchMap((st) => end$.pipe(map(() => st))),
            )
            .subscribe((st) => {
                const [source, target] = st
                if (source.id === target.id) {
                    return
                }
                const cur = li$.value
                const fit = cur.findIndex((v) => v.id === target.id)
                const next = cur.filter((v) => v.id !== source.id)
                next.splice(fit, 0, source)
                li$.next(next)

                console.log(st.map((v) => v.txt))
            })
        return () => ob.unsubscribe()
    }, [])

    return (
        <div className={css(s.root, sc.padd(20))}>
            {arr.map((v) => (
                <div
                    style={{
                        fontSize: '14px',
                        padding: '5px',
                        width: '40px',
                    }}
                    draggable
                    onDragStart={(e: any) => {
                        source$.next(v)
                        e.target.style.opacity = 0.5
                    }}
                    onDragEnd={(e: any) => {
                        e.target.style.opacity = 1
                    }}
                    onDragEnter={() => {
                        target$.next(v)
                    }}
                    key={v.id}
                >
                    {v.txt}
                </div>
            ))}
        </div>
    )
}

interface one {
    id: number
    txt: string
}
