const fs = require('fs')

const file_path = 'public/scrap/config.js'

module.exports = {
    /**
     * 更新设置文件
     * @param {string} host
     */
    update_host(host) {
        const re = build_apijs(host)
        fs.writeFileSync(file_path, re)
    },
    /** 重置设置文件 */
    reset_host() {
        const re = build_apijs()
        fs.writeFileSync(file_path, re)
    },
}
/** 构造api.js的文本 */
function build_apijs(host = 'SERVER_HOST') {
    return `
;(function() {
    if (!window.SCRAP) {
        window.SCRAP = {}
    }

    const o = {
        // xxx.xxx.xxx.xxx:xx
        host: '${host}', 
    }

    Object.assign(window.SCRAP, o)
})()
    `
}
