const dos = require('../js-util/do-shell')
const util_api = require('../js-util/rewrite-host')
const fs = require('fs')
const path = require('path')
const io = require('../js-util/io')

/** 路径前缀 */
const project = `react-project`
/** 服务器短配置 */
const service = process.argv[2] || 56
const ip = `172.16.200.${service}`

main()

function main() {
    util_api.update_host(`${ip}:50001`)

    build()
    move()
    effect()

    util_api.reset_host()
}

/** 打包 */
function build() {
    dos.do_shell(`yarn build`)
    const root = path.resolve('.')
    fs.renameSync(path.resolve(root, 'build'), path.resolve(root, project))
}

/** 上传 */
function move() {
    dos.do_shell_try(`ssh root@${ip} "cd /data/srsrecord && rm -rf ${project}"`)
    dos.do_shell(`scp -r ${project} root@${ip}:/data/srsrecord`)
}

/** 最后效果 */
function effect() {
    const dir = path.resolve('.', project)
    io.rm_dir(dir)
    dos.do_shell_try(`explorer http://${ip}/${project}/`)
}
