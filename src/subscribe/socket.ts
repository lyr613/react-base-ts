import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { BaseWsUrl } from '@/const'
import { interval, timer, of, Subject, ReplaySubject } from 'rxjs'
import { filter, catchError, tap, map, switchMap, mapTo, exhaustMap, switchMapTo } from 'rxjs/operators'
class obj {
    [k: string]: any
}
class SocketDto {
    [k: string]: any
}

/** 上传使用此subj */
export const SocketSend$ = new ReplaySubject<WebSocketSubject<obj>>(1)

/** 每20s自动重试连接的socket */
const subj$ = timer(0, 1000 * 20).pipe(
    filter((n) => n < 0), // 加此行则永远无法发出请求
    map(() => (Math.random() * 999999) | 0),
    exhaustMap((s) => {
        const ws = webSocket({
            url: BaseWsUrl + s,
            deserializer(v): obj {
                if (v == null) {
                    return {}
                }
                try {
                    return JSON.parse(v.data)
                } catch (error) {
                    return {}
                }
            },
        })
        ws.subscribe(undefined, (err) => {
            console.log('socket断开连接')
            ws.complete()
        })
        SocketSend$.next(ws)
        return ws.pipe(catchError((err) => of(err)))
    }),
)

/** 接收使用此subj */
export const Socket$ = new Subject<SocketDto>()
subj$
    .pipe(
        filter((v) => {
            if (typeof v !== 'object') {
                return false
            }
            if (Object.entries(v).length === 0) {
                return false
            }
            if (v.memberTrend === undefined) {
                return false
            }
            return true
        }),
        tap((v) => {
            // console.log('socket传来消息')
            // console.log(v)
        }),
    )
    .subscribe(Socket$)

// 心跳
// timer(1000, 1000 * 60 * 5)
// 	.pipe(
// 		switchMap(() => SocketSend$),
// 		filter(v => !!v),
// 	)
// 	.subscribe(subj => {
// 		subj.next({
// 			heart: 2,
// 		})
// 	})
