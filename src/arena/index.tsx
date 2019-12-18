// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'

export default function Index() {
    const [q, set_q] = useState(2)
    return <div className={s.Index}>{q}</div>
}
