type change_key = 'Y' | 'M' | 'D' | 'h' | 'm' | 's'
/**
 *
 * @param key 变化什么, Y M D h m s
 * @param value 变化值
 * @param be_change true变化, false覆盖
 */
export function change_date(key: change_key, value: number, be_change = true) {
	return (_: Date) => {
		const __ = new Date(_.toString())
		switch (key) {
			case 'Y':
				__.setFullYear(be_change ? __.getFullYear() + value : value)
				break
			case 'M':
				__.setMonth(be_change ? __.getMonth() + value : value)
				break
			case 'D':
				__.setDate(be_change ? __.getDate() + value : value)
				break
			case 'h':
				__.setHours(be_change ? __.getHours() + value : value)
				break
			case 'm':
				__.setMinutes(be_change ? __.getMinutes() + value : value)
				break
			case 's':
				__.setSeconds(be_change ? __.getSeconds() + value : value)
				break
			default:
				break
		}
		return __
	}
}

/**
 * 设置: 年
 * @param n 新年份
 */
export function set_year(n: number) {
	return (_: Date) => {
		const __ = new Date(_.toString())
		__.setFullYear(n)
	}
}
/**
 * 偏移: 年
 * @param n 偏移量
 */
export function transform_year(n: number) {
	return (_: Date) => {
		const __ = new Date(_.toString())
		__.setFullYear(n + __.getFullYear())
	}
}
/**
 * 设置: 月
 * @param n 新数值
 */
export function set_month(n: number) {
	return (_: Date) => {
		const __ = new Date(_.toString())
		__.setMonth(n)
	}
}
/**
 * 偏移: 月
 * @param n 偏移量
 */
export function transform_month(n: number) {
	return (_: Date) => {
		const __ = new Date(_.toString())
		__.setMonth(n + __.getMonth())
	}
}
/**
 * 设置: 日
 * @param n 新数值
 */
export function set_day(n: number) {
	return (_: Date) => {
		const __ = new Date(_.toString())
		__.setDate(n)
	}
}
/**
 * 偏移: 日
 * @param n 偏移量
 */
export function transform_day(n: number) {
	return (_: Date) => {
		const __ = new Date(_.toString())
		__.setDate(n + __.getDate())
	}
}
/**
 * 设置: 时
 * @param n 新数值
 */
export function set_hour(n: number) {
	return (_: Date) => {
		const __ = new Date(_.toString())
		__.setHours(n)
	}
}
/**
 * 偏移: 时
 * @param n 偏移量
 */
export function transform_hour(n: number) {
	return (_: Date) => {
		const __ = new Date(_.toString())
		__.setHours(n + __.getHours())
	}
}
/**
 * 设置: 分
 * @param n 新数值
 */
export function set_minute(n: number) {
	return (_: Date) => {
		const __ = new Date(_.toString())
		__.setMinutes(n)
	}
}
/**
 * 偏移: 分
 * @param n 偏移量
 */
export function transform_minute(n: number) {
	return (_: Date) => {
		const __ = new Date(_.toString())
		__.setMinutes(n + __.getMinutes())
	}
}
/**
 * 设置: 秒
 * @param n 新数值
 */
export function set_second(n: number) {
	return (_: Date) => {
		const __ = new Date(_.toString())
		__.setSeconds(n)
	}
}
/**
 * 偏移: 秒
 * @param n 偏移量
 */
export function transform_second(n: number) {
	return (_: Date) => {
		const __ = new Date(_.toString())
		__.setSeconds(n + __.getSeconds())
	}
}
