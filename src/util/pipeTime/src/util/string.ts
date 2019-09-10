/**
 * 强制改变字符长度, 不足则在前面填充pad
 * @param {string | number} s 需要改变长度的字符串
 * @param {number} length 要求长度
 * @param {string} pad 前填充
 */
export function ForceLength(s = '', length = 2, pad = '0') {
	const old = s + ''
	if (old.length < length) {
		return old.padStart(length, pad)
	}
	return old
		.split('')
		.slice(0 - length)
		.join('')
}
