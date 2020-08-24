import { ajax } from 'rxjs/ajax'
import { catchError, map, switchMap, tap, filter, debounceTime, merge } from 'rxjs/operators'
import { of, Observable, Subject, BehaviorSubject } from 'rxjs'
import qs from 'qs'

type method = 'get' | 'post' | 'put' | 'delete'

export const host$ = new BehaviorSubject(default_host())

export function rxajax_base(url: string, method: method, body?: any): Observable<any> {
    if (method === 'get' && !!body) {
        url += (url.match(/\?/) ? '&' : '?') + qs.stringify(body)
        body = undefined
    }
    return ajax({
        url,
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        withCredentials: false, // 携带cookie
        body,
    }).pipe(
        catchError((err) => of(err)),
        map((v) => v.response || {}),
    )
}

/**
 * 返回rx的ajax
 * @param url 使用 BuildUrl 构造完整url
 * @param method
 * @param body {k:v} get会自动转为url
 */
export function rxajax<T = any>(url$: Observable<string>, method: method, body?: any): Observable<T> {
    return url$.pipe(switchMap((url) => rxajax_base(url, method, body))).pipe()
}

export function default_host(): string {
    /** 第一个开发用, 最后一个发布用 */
    const hosts = ['172.16.200.157:50001']
    const node = process.env.NODE_ENV
    if (node === 'development') {
        // 开发
        // return hosts[0]
        return 'cas-playbook-dev.cas-air.cn/app'
    }
    const hand_host = 'SERVER_HOST'
    if (hand_host !== 'SERVER_HOST') {
        // 外部js配置
        return hand_host
    }
    // 普通部署
    return hosts[hosts.length - 1]
}

/** 构造url
 * @param rest_url
 * @param query 查询参数, 拼接到url最后
 *  如果以api/public开头, 可以正确获取地址拼接
 */
export function mkurl(rest_url: string, query?: Object) {
    if (query) {
        const sq = qs.stringify(query)
        const brige = /\?/.test(rest_url) ? '&' : '?'
        rest_url += brige + sq
    }
    return host$.pipe(
        map((host) => {
            return `http://${host}/${rest_url}`
        }),
    )
}
