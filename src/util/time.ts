function full(s: number): string {
	return String(s).padStart(2, '0')
}

export const Formats = {
	YMD: '{Y4}-{M2}-{D2}',
	hds: '{h}:{m}:{s}',
	YMDhds: '{Y4}-{M2}-{D2} {h}:{m}:{s}',
	YMDhds2: '{Y4}年{M2}月{D2}日 {h}时{m}分{s}秒',
	xq: '星期{W}',
}
class Time {
	_!: Date
	constructor() {
		this._ = new Date()
	}
	/**
	 *
	 * @param funcs 目前只有change函数
	 */
	pipe(...funcs: Function[]) {
		let re = new Date(this._)
		for (let i = 0; i < funcs.length; i++) {
			const func = funcs[i]
			re = func(re)
		}
		return TimeOf(re)
	}
	/**
	 * @param {string} fmt
	 */
	format(fmt?: string) {
		const {_} = this
		if (!fmt) {
			return _.getTime()
		}
		const Y4 = this._.getFullYear() + ''
		const Y2 = Y4.slice(2, 9)
		const M = this._.getMonth() + 1
		const M2 = full(M)
		const D = this._.getDate()
		const D2 = full(D)
		const h = this._.getHours()
		const h2 = full(h)
		const m = this._.getMinutes()
		const m2 = full(m)
		const s = this._.getSeconds()
		const s2 = full(s)
		// 星期
		const w = this._.getDay()
		const W = '日一二三四五六'[w]

		return fmt
			.replace('{Y4}', Y4)
			.replace('{Y2}', Y2)
			.replace('{M}', M + '')
			.replace('{M2}', M2)
			.replace('{D}', D + '')
			.replace('{D2}', D2)
			.replace('{h}', h + '')
			.replace('{h2}', h2)
			.replace('{m}', m + '')
			.replace('{m2}', m2)
			.replace('{s}', s + '')
			.replace('{s2}', s2)
			.replace('{w}', w + '')
			.replace('{W}', W)
	}
}

type change_key = 'Y' | 'M' | 'D' | 'h' | 'm' | 's'
/**
 *
 * @param  key 变化什么, Y M D h m s
 * @param  value 值
 * @param   be_change 是变化还是覆盖
 */
function change(key: change_key, value: number, be_change = true) {
	return (_: Date) => {
		const __ = new Date(_)
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

export function TimeOf(some?: any) {
	const t = new Time()
	if (some) {
		t._ = new Date(some)
	}
	return t
}
