import {webSocket, WebSocketSubject} from 'rxjs/webSocket'
import {WsBaseurl} from '@/const'
import {interval, timer, of} from 'rxjs'
import {filter, catchError} from 'rxjs/operators'

class obj {
	[k: string]: any
}

const subj = webSocket({
	url: 'ws://localhost:9000/sss1',
	deserializer(v): obj {
		const d = v.data
		if (typeof d === 'string') {
			return {}
		}
		return v.data
	},
})
const Socket$ = subj.pipe()

timer(1000, 1000).subscribe(() => {
	subj.next({type: 'heart'})
})

// const ob1 = Socket$.subscribe(v => {
//     console.log(v)
// })
const ob2 = Socket$.subscribe(v => {
	console.log(v)
})
