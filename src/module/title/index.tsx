import React, {useState, useEffect} from 'react'
import s from './s.module.scss'
import {fromEvent} from 'rxjs'
import {concatMap, takeUntil, map, mergeAll, mergeMap, mapTo, merge} from 'rxjs/operators'

export function Title() {
	const r = (Math.random() * 255) | 0
	const g = (Math.random() * 255) | 0
	const b = (Math.random() * 255) | 0
	useEffect(() => {
		const dom = document.getElementById('ball')!
		const down$ = fromEvent(dom, 'mousedown')
		const out$ = fromEvent(dom, 'mouseout').pipe(mapTo(1))
		const up$ = fromEvent(dom, 'mouseup').pipe(mapTo(1))
		const move$ = fromEvent(dom, 'mousemove')
		const drag$ = down$
			.pipe(
				concatMap((ste: any) => {
					const left0 = dom.offsetLeft
					const top0 = dom.offsetTop
					const stop$ = up$.pipe(merge(out$))
					return move$.pipe(
						takeUntil(stop$),
						map((ede: any) => ({
							x: ede.x - ste.x + left0,
							y: ede.y - ste.y + top0,
						})),
					)
				}),
			)
			.subscribe(v => {
				console.log(v)
			})
	}, [])
	return (
		<section className={s.B} style={{height: '100vh', backgroundColor: `rgb(${r},${g},${b})`}}>
			<div className={s.ball} id="ball" style={{height: '100%'}} />
		</section>
	)
}
