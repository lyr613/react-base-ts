const path = require('path')
const fs = require('fs')

/**
 * 获取原文件数组, 以换行分割
 * @param  {...string} src 路径
 */
function GetOldTextArr(src) {
	const old = fs.readFileSync(src).toString()
	const arr = old.split(/\n/)
	// console.log(p)
	return arr
}

function WriteNewTextArr(src, lines) {
	const txt = lines.join('\n')
	fs.writeFileSync(src, txt)
}

module.exports = {
	GetOldTextArr,
	WriteNewTextArr,
}
