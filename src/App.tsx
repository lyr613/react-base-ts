import React, {useEffect} from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import {throttleTime, mapTo, map, debounceTime, pluck, tap, switchMap, take} from 'rxjs/operators'
import {BehaviorSubject, fromEvent, timer} from 'rxjs'

import {Title} from './module/title'
import {News} from './module/news'
import {Characters} from './module/characters'
import {Story} from './module/story'
import {Archive} from './module/archive'
import {Foot} from './module/foot'
import {Head} from './module/head'

function App() {
	// 实现滚轮直接滚一屏
	useEffect(() => {
		const ob = fromEvent(document.getElementById('app')!, 'mousewheel')
			.pipe(
				tap(e => e.preventDefault()),
				throttleTime(500),
				pluck('wheelDelta'),
				map(n => (n > 0 ? 1 : 0)),
				map(be_up => {
					const now = document.documentElement.scrollTop
					const H = window.innerHeight
					let next = 0
					if (now % H === 0) {
						next = be_up ? now - H : now + H
					} else {
						next = Math.floor(now / H) * H + (be_up ? 0 : H)
					}
					const step = Math.floor((Math.abs(next - now) - 1) / 30) + 1
					return [be_up, step, next]
				}),
				switchMap(arr =>
					timer(0, 17).pipe(
						take(arr[1]),
						map(i => [arr[0], i, arr[2]]),
					),
				),
			)
			.subscribe(arr => {
				const [be_up, i, flag] = arr
				const dt = 30
				const now = document.documentElement.scrollTop
				if (Math.abs(now - flag) <= dt * 2) {
					window.scrollTo(0, flag)
				} else {
					window.scrollTo(0, now + (be_up ? -dt : dt))
				}
			})
		return () => ob.unsubscribe()
	}, [])
	return (
		<div id="app">
			<Head />
			<Title />
			<News />
			<Characters />
			<Story />
			<Archive />
			<Foot />
		</div>
	)
}

export default App
