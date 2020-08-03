declare global {
    type int = number
    type float = number
}

declare interface Window {
    /** 配置文件 */
    SETTING: {
        /** ip:port */
        host: string
    }
}
