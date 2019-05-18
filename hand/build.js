const os = require('child_process')
const fs = require('fs')
const src = 'did'

function removeDir(s) {
	if (fs.existsSync(s)) {
		// 因为用node不允许直接删非空文件夹
		os.execSync(`rmdir /s/q ${s}`)
		// os.execSync(`del ${s} -recurse`) powershell命令, 貌似并不能使用
	}
}
function clearDid() {
	const has = fs.readdirSync(src).filter(v => v.match(/json|js/))
	has.forEach(f => {
		fs.unlinkSync(`${src}/${f}`)
	})
}
console.log(' -> 清空上次遗留')

removeDir('build')
removeDir(src)

console.log('清空上次遗留 -> 打包')

os.execSync('yarn build')

console.log('打包 -> 重命名')

os.execSync('ren build did')

console.log('重命名 -> 清理无用文件')

clearDid()

console.log('完毕')
