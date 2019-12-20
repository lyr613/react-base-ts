export function get_host() {
    /** 第一个开发用, 最后一个发布用 */
    const hosts = [
        '172.16.200.56:50001',
        '172.16.200.57:50001',
        '172.16.200.56:50001',
        '172.16.200.56:50001',
        '172.16.200.56:50001',
        '172.16.200.56:50001',
        '172.16.200.56:50001',
    ]
    const node = process.env.NODE_ENV
    if (node === 'development') {
        // 开发
        return hosts[0]
    }
    // sessionStorage配置
    const stro_set = sessionStorage.host
    if (stro_set) {
        return stro_set
    }
    // 外部js配置
    const win_set = (window as any).SCRAP?.host ?? 'SERVER_HOST'
    if (win_set !== 'SERVER_HOST') {
        return win_set
    }
    // 普通部署
    return hosts[hosts.length - 1]
}

// ------ 构造url部分 ------

/**
 * 构造每个url
 * @param rest 剩余地址
 */
export function build_url(rest: string) {
    return `http://${get_host()}/services/api/bs/${rest}`
}

/** 构造文件地址 */
export function build_file_url(rest: string) {
    return `http://${get_host()}/services/api/bs/${rest}`
}
