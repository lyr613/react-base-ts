declare type int = number
declare type float = number
interface Param {
    [k: string]: any
}
interface Window {
    /** 配置文件 */
    SETTING: {
        /** ip:port */
        host: string
    }
}
interface Fetch<T = any> {
    status: number
    msg: string
    data: T
}
interface FetchPage<T = any> extends Fetch {
    data: {
        records: T[]
        total: number
    }
}
