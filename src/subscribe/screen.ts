import { BehaviorSubject, fromEvent, timer, Observable } from 'rxjs'
import { throttleTime, mapTo, map, debounceTime, pluck, tap, switchMap, take, merge, scan } from 'rxjs/operators'

/**
 * 屏幕尺寸信息
 * [width, height]
 */
export const ScreenSize$: Observable<[number, number]> = fromEvent(window, 'resize').pipe(
    merge(fromEvent(window, 'load')),
    debounceTime(500),
    map(() => {
        return [window.innerWidth, window.innerHeight]
    }),
)

/**
 * 屏幕滚动信息
 * [滚动方向: 负数向上正数向下, 现在的顶部距离]
 */
export const ScreenScroll$: Observable<[number, number]> = fromEvent(window, 'scroll').pipe(
    map(() => [0, document.documentElement.scrollTop || document.body.scrollTop] as [number, number]),
    scan((p, v) => {
        const [_, nt] = v
        const [a, pt] = p
        return [nt - pt, nt] as [number, number]
    }),
)
