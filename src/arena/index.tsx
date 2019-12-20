// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { BehaviorSubject } from 'rxjs'
import { useObservable } from 'rxjs-hooks'

interface so {
    name: string
}
const re$ = new BehaviorSubject<null | so>(null)

export default function Index() {
    const r = useObservable(() => re$)
    const q = r?.name

    return <div className={s.Index}>{q}</div>
}
