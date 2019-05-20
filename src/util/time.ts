function full(s: Number): string {
	return String(s).padStart(2, '0')
}
class Time {
	/** 时间对象  */
	private dt: Date
	Y!: string
	M!: string
	D!: string
	h!: string
	m!: string
	s!: string
	w!: number
	/** 到毫秒的时间戳 */
	int: number = 0
	constructor(a?: any) {
		this.dt = a ? new Date(a) : new Date()
		this.Y = full(this.dt.getFullYear())
		this.M = full(this.dt.getMonth() + 1)
		this.D = full(this.dt.getDate())
		this.h = full(this.dt.getHours())
		this.m = full(this.dt.getMinutes())
		this.s = full(this.dt.getSeconds())
		this.int = this.dt.getTime()
		this.w = this.dt.getDay()
	}
	static of(a?: any) {
		return new Time(a)
	}
	/**
	 * 格式化, 无参数时返回YYYY年MM月DD日 hh时mm分ss秒
	 * @param b0 连接年月日的符号
	 * @param b1 连接时分秒的符号
	 * @param use 只用date或time
	 */
	public format(b0?: string, b1?: string, use?: 'date' | 'time'): string {
		const {Y, M, D, h, m, s} = this
		let [a, b] = ['', '']
		/** 没有连接符 */
		if (b0 === undefined) {
			a = `${Y}年${M}月${D}日`
			b = `${h}时${m}分${s}秒`
		} else {
			b1 = b1 || b0
			a = [Y, M, D].join(b0)
			b = [h, m, s].join(b1)
		}
		if (use === 'date') {
			return a
		}
		if (use === 'time') {
			return b
		}
		return a + ' ' + b
	}
	/**
	 * name
	 */
	get week() {
		const w = this.dt.getDay()
		const ws = '日一二三四五六'
		return ws[w]
	}
	/** 变化推断 比如['Y', -1] 则向前一年, ['D']会把日归零 */
	public change(cs: [string, number | undefined][]) {
		cs.forEach(c => {
			const [w, d] = c
			switch (w) {
				case 'Y':
					this.dt.setFullYear(d ? this.dt.getFullYear() + d : 0)
					break
				case 'M':
					this.dt.setMonth(d ? this.dt.getMonth() + d : 0)
					break
				case 'D':
					this.dt.setDate(d ? this.dt.getDate() + d : 0)
					break
				case 'h':
					this.dt.setHours(d ? this.dt.getHours() + d : 0)
					break
				case 'm':
					this.dt.setMinutes(d ? this.dt.getMinutes() + d : 0)
					break
				case 's':
					this.dt.setSeconds(d ? this.dt.getSeconds() + d : 0)
					break
				default:
					break
			}
		})
	}
	/**
	 * 拷贝一份自己, 返回一个同时间的对象
	 */
	public copy() {
		return Time.of(this.dt)
	}
}

export {Time}
