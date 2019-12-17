import { ajax } from 'rxjs/ajax'
import { catchError, map, switchMap, tap, filter, debounceTime, merge } from 'rxjs/operators'
import { of, Observable, Subject, BehaviorSubject } from 'rxjs'

type method = 'get' | 'post'

/**
 * 返回rx的ajax
 * @param url 使用 BuildUrl 构造完整url
 * @param method
 * @param body {k:v} get会自动转为url
 */
export function rx_ajax<T>(url: string, method: method = 'post', body?: Param): Observable<T> {
    if (method === 'get' && !!body) {
        url += (url.match(/\?/) ? '&' : '?') + tran_query_2_url(body)
        body = undefined
    }
    if (method === 'post' && !body) {
        body = {}
    }
    return ajax({
        url: url,
        method,
        headers: {
            'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        withCredentials: true,
        body,
    }).pipe(
        catchError((err) => of(err)),
        map((v) => v.response || {}),
        filter((v) => v.status === 200),
        map((v) => v.data),
        filter((v) => !!v),
    )
}

/** 把get query参数转化为url部分 */
export function tran_query_2_url(p: Param) {
    const arr = Object.entries(p).map((v) => `${v[0]}=${v[1]}`)
    return arr.join('&')
}
