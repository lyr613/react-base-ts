import { BaseUrl } from '@/const'
import { ajax } from 'rxjs/ajax'
import { catchError, map } from 'rxjs/operators'
import { of } from 'rxjs'

type method = 'post' | 'get' | 'put' | 'delete'
type body = {
	[k: string]: any
}
export function RxAjax(url: string, method: method = 'post', body?: body) {
	return ajax({
		url: BaseUrl + url,
		method,
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('token'),
		},
		body,
	}).pipe(
		map(v => v.response),
		catchError(err => of(err.response)),
	)
}
