const fs = require('fs')
const path = require('path')

const io = {
    /** 递归删除文件夹 */
    rm_dir(p) {
        let files = []
        if (fs.existsSync(p)) {
            files = fs.readdirSync(p)
            files.forEach((name) => {
                const it_path = path.resolve(p, name)
                if (fs.statSync(it_path).isDirectory()) {
                    io.rm_dir(it_path)
                } else {
                    fs.unlinkSync(it_path)
                }
            })
            fs.rmdirSync(p)
        }
    },
}

module.exports = io
