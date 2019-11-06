// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'

export default function Example() {
    const arr = Array.from(
        {
            length: 12,
        },
        (_, i) => {
            return i
        },
    )
    return <div className={s.Example}>{arr.map((n, _) => (n % 2 === 0 ? <div>{n}</div> : null))}</div>
}
