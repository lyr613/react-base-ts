import React, { useState, useEffect, useRef } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'
import { fromEvent } from 'rxjs'
import { merge, map, concatMap, takeUntil, scan } from 'rxjs/operators'

/** CanvasDraw */
export default function CanvasDraw() {
    const ref = useRef<null | HTMLCanvasElement>(null)
    useEffect(() => {
        const dom = ref.current
        if (!dom) {
            return
        }
        const cns = dom.getContext('2d')!
        const start$ = fromEvent(dom, 'mousedown')
        const move$ = fromEvent(dom, 'mousemove')
        const leave$ = fromEvent(dom, 'mouseleave')
        const up$ = fromEvent(dom, 'mouseup')
        const stop$ = leave$.pipe(merge(up$))
        const ob = start$
            .pipe(
                concatMap(() => move$.pipe(takeUntil(stop$), map(_get_layerxy))),
                scan(
                    (arr, next) => {
                        const last = arr.slice(-1)[0]
                        if (last.length > 50) {
                            const nl = [last.slice(-1)[0], next]
                            return [...arr, nl]
                        }
                        last.push(next)
                        return [...arr]
                    },
                    [[]] as pt[][],
                ),
                map((arr) => {
                    const step = (360 / (arr.length || 1)) | 0
                    const colors = Array.from({ length: step }, (_, i) => `hsl(${i * step}, 100%, 38%)`)
                    const graphs = arr.map((pts, i) => {
                        const clr = colors[i]
                        const p = new Path2D()
                        p.moveTo(pts[0].x, pts[0].y)
                        pts.forEach((pt) => {
                            p.lineTo(pt.x, pt.y)
                        })
                        return { p, clr }
                    })
                    return graphs
                }),
            )
            .subscribe((graphs) => {
                cns.clearRect(0, 0, 800, 600)
                graphs.forEach((g) => {
                    cns.strokeStyle = g.clr
                    cns.stroke(g.p)
                })
            })
    }, [])
    return (
        <div className={css(s.root)}>
            <canvas width={800} height={600} ref={ref} className={css(s.canvas)}></canvas>
        </div>
    )
}

interface pt {
    x: number
    y: number
}

function _get_layerxy(e: any) {
    return {
        x: e.layerX,
        y: e.layerY,
    }
}
