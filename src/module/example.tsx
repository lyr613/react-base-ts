// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'

export default function Example() {
    const arr = Array.from(
        {
            length: 12,
        },
        (_, i) => {
            return `第${i + 1}个`
        },
    )
    const [did_select, set_did_select] = useState(-1)

    return (
        <div className={s.Example}>
            {arr.map((n, i) =>
                i % 2 === 0 ? (
                    <div
                        className={s.line + ' ' + (did_select === i ? s.sel : '')}
                        onClick={() => {
                            set_did_select(i)
                        }}
                    >
                        {n}
                    </div>
                ) : null,
            )}
        </div>
    )
}
