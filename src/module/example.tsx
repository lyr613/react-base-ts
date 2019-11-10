// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { BarIndex$, Tabel$, BarIndexUpdater$ } from './subj'
import { useObservable } from 'rxjs-hooks'

/** 示例组件 */
export default function Example() {
    useEffect(() => {
        BarIndexUpdater$.next(0)
    }, [])
    return (
        <div className={s.Example}>
            <Bar />
            <Table />
        </div>
    )
}

function Bar() {
    const barindex = useObservable(() => BarIndex$, 0)
    return (
        <div className={s.Bar}>
            {Array.of(1, 1, 3).map((_, i) => (
                <div
                    className={s.item + ' ' + (barindex === i ? s.highlight : '')}
                    key={i}
                    onClick={() => {
                        BarIndexUpdater$.next(i)
                    }}
                >
                    大标签{i}
                </div>
            ))}
        </div>
    )
}
function Table() {
    const ta = useObservable(() => Tabel$)
    return (
        <div className={s.Table}>
            <div className={s.thead}>
                {ta &&
                    ta.thead.map((str) => (
                        <div className={s.td} key={str}>
                            {str}
                        </div>
                    ))}
            </div>
            {ta &&
                ta.tbody.map((line, i) => (
                    <div className={s.tr} key={i}>
                        <div className={s.td}>{line[0]}</div>
                        <div className={s.td}>{line[1]}</div>
                        <div className={s.td}>{line[2]}</div>
                    </div>
                ))}
        </div>
    )
}
