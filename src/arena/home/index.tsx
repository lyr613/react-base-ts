import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'
import { useHistory } from 'react-router'

/** Home */
export default function Home() {
    const h = useHistory()
    return (
        <div
            className={css(s.root, sc.padd(20))}
            onClick={() => {
                h.push('canvas')
            }}
        >
            home
        </div>
    )
}
