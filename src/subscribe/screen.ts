import { BehaviorSubject, fromEvent } from 'rxjs'
import { throttleTime, mapTo, map } from 'rxjs/operators'

/** 获得屏幕类型 */
function get_screen() {
	const [W, H] = [window.innerWidth, window.innerHeight]
	const type: 'pc' | 'm' = W > H ? 'pc' : 'm'
	const level = [0, 1000, 1361, 1921, 4000].findIndex(v => W < v)
	return {
		type,
		level,
	}
}

/** 获取屏幕尺寸信息 */
function get_it() {
	const [W, H] = [window.innerWidth, window.innerHeight]
	const screen = get_screen()
	return {
		W,
		H,
		screen_type: screen.type,
		screen_level: screen.level,
	}
}

/** 屏幕尺寸信息
 * @returns screen 数值越大, 屏幕越宽
 */
export const Screen$ = new BehaviorSubject(get_it())

fromEvent(window, 'resize')
	.pipe(
		throttleTime(300),
		map(() => get_it()),
	)
	.subscribe(Screen$)
