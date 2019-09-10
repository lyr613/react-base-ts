import { ForceLength } from '../util'

/**
 * 常用格式化文本
 */
export const common_formats = {
	/** YYYY-MM-DD */
	YMD: '{Y4}-{M2}-{D2}',
	/** hh-mm-ss */
	hms: '{h2}:{m2}:{s2}',
	/** YYYY-MM-DD hh:mm:ss */
	YMDhms: '{Y4}-{M2}-{D2} {h2}:{m2}:{s2}',
	/** {Y}年{M}月{D}日 {h}时{m}分{s}秒 */
	YMDhms2: '{Y}年{M}月{D}日 {h}时{m}分{s}秒',
	/** YYYYMMDDhhmmss */
	YMDhms3: '{Y4}{M2}{D2}{h2}{m2}{s2}',
	/** 星期x */
	xq: '星期{W}',
}

/**
 * @param {string} fmt 模版替换 {[YMDhms]\d}
 *
 * 如{Y4}替换为2019,
 *
 * 字母为 YMDhms 中的一个
 *
 * 数字为1-9, 不写则为自然位数
 */
export function format_date(fmt: string = '') {
	return (_: Date) => {
		const regx = new RegExp('{[YMDhms]\\d?}')
		let will_replace = fmt.match(regx)
		while (will_replace) {
			const wn = will_replace[0]
			const [_0, w, n] = wn.split('')
			const has_n = n !== '}'
			let new_s = ''
			let _gd = 0
			switch (w) {
				case 'Y':
					_gd = _.getFullYear()
					break
				case 'M':
					_gd = _.getMonth() + 1
					break
				case 'D':
					_gd = _.getDate()
					break
				case 'h':
					_gd = _.getHours()
					break
				case 'm':
					_gd = _.getMinutes()
					break
				case 's':
					_gd = _.getSeconds()
					break
				default:
					break
			}
			new_s = has_n ? ForceLength(String(_gd), Number(n)) : String(_gd)
			fmt = fmt.replace(regx, new_s)
			will_replace = fmt.match(regx)
		}
		// 星期
		const w = _.getDay()
		const W = '日一二三四五六'[w]

		return fmt.replace('{w}', String(w)).replace('{W}', W)
	}
}
