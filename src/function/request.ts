import { BaseUrl } from '@/const'
import { ajax } from 'rxjs/ajax'
import { catchError, map } from 'rxjs/operators'
import { of } from 'rxjs'

type method = 'post' | 'get' | 'put' | 'delete'
type body = {
    [k: string]: any
}

function get_url(s: string) {
    if (s.match(/^http/)) {
        return s
    }
    return BaseUrl + s
}
export function RxAjax(url: string, method: method = 'post', body?: body) {
    return ajax({
        url: get_url(url),
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
        },
        body,
    }).pipe(
        map((v) => v.response),
        catchError((err) => of(err.response)),
    )
}
